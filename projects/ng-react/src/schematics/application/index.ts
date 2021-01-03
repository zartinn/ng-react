import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  SchematicsException,
  noop,
  mergeWith,
  apply,
  url,
  move,
  filter,
  applyTemplates,
  template,
  MergeStrategy,
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import {
  getWorkspace,
  updateWorkspace,
} from '@schematics/angular/utility/workspace';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { join } from 'path';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

interface ApplicationOptions {
  name: string;
  customWebpackConfig?: boolean;
}

export default function (options: ApplicationOptions): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = workspace.projects.get(options.name as string);
    const projectRoot = (workspace.extensions.newProjectRoot as string) || '';
    if (project) {
      throw new SchematicsException(
        `The project '${options.name}' already exists.`
      );
    }
    const appRoot = join(projectRoot, options.name);

    return chain([
      updateAngularJson(options, appRoot),
      copyFiles(options, appRoot),
    ]);
  };
}

function updateAngularJson(options: ApplicationOptions, appRoot) {
  // see: https://github.com/angular/angular-cli/blob/d5bbed0298c67bbbc52e42f1373f3fc3aed2c6ac/packages/schematics/angular/application/index.ts#L93
  const project = {
    root: appRoot,
    sourceRoot: join(appRoot, 'src'),
    projectType: ProjectType.Application,
    targets: {
      build: {
        builder: 'ng-react:build',
        // options: {
        //   outputPath: `dist/${options.name}`,
        //   assets: [
        //     `${sourceRoot}/favicon.ico`,
        //     `${sourceRoot}/assets`,
        //   ]
        // },
        // configurations: {
        //   production: {
        //     fileReplacements: [{
        //       replace: `${sourceRoot}/environments/environment.ts`,
        //       with: `${sourceRoot}/environments/environment.prod.ts`,
        //     }],
        //     optimization: true,
        //     outputHashing: 'all',
        //     sourceMap: false,
        //     namedChunks: false,
        //     extractLicenses: true,
        //     vendorChunk: false,
        //   },
        // },
      },
      serve: {
        builder: 'ng-react:serve',
      },
    },
  };
  return updateWorkspace((workspace) => {
    workspace.projects.add({
      name: options.name,
      ...project,
    });
  });
}

function copyFiles(options, appRoot) {
  function removeWebpackConfig(path: string): boolean {
    const toRemoveList = /webpack\.config\.js$/;
    return !toRemoveList.test(path);
  }

  const depth = appRoot.split('/').length;
  let relativePath = '';
  for (let i = 0; i < depth - 1; i++) {
    relativePath += '../';
  }
  
  return mergeWith(
    apply(url('./files'), [
      //   options.customWebpackConfig ? noop() : filter(removeWebpackConfig),
      filter(removeWebpackConfig),
      applyTemplates({
        utils: strings,
        relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(appRoot),
        ...options,
        appName: options.name,
        isRootApp: false
      }),
      // applyTemplates({
      //   utils: strings,
      //   ...options,
      //   relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(appDir),
      //   appName: options.name,
      //   isRootApp,
      // }),
      // isRootApp ? mergeWithRootTsLint(host) : noop(),
      move(appRoot),
    ])
    // MergeStrategy.Overwrite
  );
  return noop();
}
