const fsE = require('fs-extra');
const path = require('path');

const ngReact = { dist: path.join(__dirname, '..', 'dist', 'ng-react'), name: 'ng-react'}

function link(project) {
    const fromPath = path.resolve(project.dist);
    const toPath = path.resolve(path.join(__dirname, '..', 'node_modules', project.name));
    const parentToDir = path.dirname(toPath);
    fsE.ensureDirSync(parentToDir);
    if (fsE.existsSync(path.resolve(fromPath))) {
        try {
            fsE.symlinkSync(fromPath, toPath, 'junction');
            console.log('Symlink for ' + project.name + ' created.');
        } catch (e) {
            console.log('Symlink for ' + project.name + ' already exists.');
        }
    }
}

link(ngReact);