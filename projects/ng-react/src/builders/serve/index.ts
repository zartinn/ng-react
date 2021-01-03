import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { json, workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { ChildProcess, spawn } from 'child_process';
import { resolve } from 'path';
import { from, Observable, of, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface WebpackConfig {
    path: string;
    externals: any[];
}

export interface ServeOptions {
    webpackConfigPath?: string;
    babelConfigPath?: string;
    port?: string;
    host?: string;
    open?: boolean;
    liveReload?: boolean;
    watch?: boolean;
    sourceMaps?: boolean;
}

export function execute(options: ServeOptions, context: BuilderContext): Observable<BuilderOutput> {
    const setup = async () => {
        const workspaceHost = workspaces.createWorkspaceHost(new NodeJsSyncHost());
        const { workspace } = await workspaces.readWorkspace(context.workspaceRoot, workspaceHost);
        const project: workspaces.ProjectDefinition = workspace.projects.get(context.target.project);
        return project.root;
    };


    return from(setup()).pipe(
        switchMap(root => {
            if (!root) {
                return of({ success: false });
            }
            process.env.projectRoot = root;
            return startWebpack([], context);
        })
    );
}

function startWebpack(options, context): Observable<BuilderOutput> {
    return new Observable(observer => {
        const args = [
            'serve',
            '-c node_modules/ng-react/builders/config/webpack.config.js'
        ];
        const cp: ChildProcess = spawn(resolve('node_modules', '.bin', 'webpack'), args, { shell: true });
        cp.stdout.on('data', data => {
            // if (options.includes('--watch')) {
                handleWatchBuildOutput(observer, context, data);
            // }
            context.logger.info(data.toString());
        });

        cp.stderr.on('data', data => {
            context.logger.error(data.toString());
        });

        cp.on('exit', code => {
            if (code === 0) {
                observer.next({ success: true });
            } else {
                observer.next({ success: false });
            }
            observer.complete();
        });
    });
}

function handleWatchBuildOutput(observer: Subscriber<BuilderOutput>, context: BuilderContext, data) {
    if (data.toString().includes('Compiling...')) {
        context.reportRunning();
    }
    if (data.toString().includes('Compiled successfully')) {
        observer.next({ success: true });
    }
    if (data.toString().includes('Failed to compile')) {
        observer.next({ success: false });
    }
}

export default createBuilder<json.JsonObject & ServeOptions>(execute);
