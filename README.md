# ng-react 0.0.1
Serve, build and test React apps with the Angular CLI

## Installation
- `npm i @angular/cli -g`
- `npm i ng-react --save-dev`

## Usage
1. have a correctly configured angular.json (assuming your React project is located at projects/demo)
    ```json
        {
            "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
            "version": 1,
            "newProjectRoot": "projects",
            "projects": {
                "demo": {
                    "projectType": "application",
                    "root": "projects/demo/",
                    "sourceRoot": "projects/demo/src",
                    "architect": {
                        "serve": {
                            "builder": "ng-react:serve"
                        }
                    }
                }
            },
            "defaultProject": "demo"
        }
    ```
2. run `ng serve`

## License
MIT

Copyright by Martin Zachoszcz