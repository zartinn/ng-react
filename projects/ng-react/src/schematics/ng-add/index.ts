import {
    chain,
    Rule,
    SchematicContext,
    Tree,
    noop
} from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { JsonObject } from '@angular-devkit/core';
import * as inquirer from 'inquirer';

export interface NgAddSchematicOptions extends JsonObject {
    'create-application'?: boolean;
    'project-name'?: string;
}

export default function(options: NgAddSchematicOptions): Rule {
    return async (host: Tree, context: SchematicContext) => {
        let answer = !!options['project-name'] && (options['create-application'] === undefined || !!options['create-application']);
        if (options['create-application'] === undefined && options['project-name'] === undefined) {
            const questions = [
                {
                    message: 'Do you want to create a new React application?',
                    type: 'confirm',
                    name: 'change'
                },
            ];
            answer = (await inquirer.prompt(questions)).change;
        }
        const name = options['project-name'];
        return chain([
            answer ? () => createApplication(context, name) : noop()
        ]);
    };
}

function createApplication(context, name) {
    context.addTask(
        new RunSchematicTask('ng-react', 'application', {
            name
        })
    );
}

function createAngularJson() {
    return (tree: Tree, _context: SchematicContext) => {
        return tree;
    }
}

// function updateAngularConfig(options: NgAddSchematicOptions): Rule {
//     return async (tree: Tree, _context: SchematicContext) => {
//         const workspace = getWorkspace(tree);
//         workspace.projects[options.name] = {
//             projectType: ProjectType.Application,
//             root,
//             sourceRoot: normalize(join(root, 'src')),
//             architect: {
//                 build: options.buildType === 'webpack' ? generateBuildTarget(options, root) : generateBuildTsTarget(options, root),
//                 serve: {
//                     builder: '@shift/builder.node:serve',
//                     options: {
//                         buildTarget: options.name + ':build',
//                     },
//                     configurations: {
//                         production: {
//                             buildTarget: options.name + ':build:production',
//                         },
//                     },
//                 },
//             },
//         } as any;
//         // return updateWorkspace(workspace) as Rule;
//     };
// }
