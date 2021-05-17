# angular-common-components

## Built With
* [Angular](https://angular.io) v. 11.2.3
* [Bootstrap](https://getbootstrap.com) v. 4.4.1
* [Storybook](https://storybook.js.org/) v. 6.1.20

## About the library

Includes components for portal and market (form builder, form components, file upload, app cards, login, signup, inputs, etc)
* Form components:
  - form builder.
  - input, selects.
  - file upload
  - color picker
  - video url
  - date time picker
  - tags
  - etc
* Common components:
  - select.
  - button
  - iframe video
  - etc.
* Portal components:
  - charts
  - app tables
* Market components:
  - app cards
  - app tables
* Auth components

## Dependencies

    "@ng-bootstrap/ng-bootstrap": "6.0.2",
    "@tinymce/tinymce-angular": "4.2.0",
    "angular-svg-icon": "11.0.0",
    "bootstrap": "4.6.0",
    "chart.js": "2.9.3",
    "ngx-color-picker": "10.1.0",
    "ngx-embed-video": "1.0.4",
    "ngx-image-cropper": "3.1.9",
    "ngx-infinite-scroll": "10.0.0",
    "ngx-owl-carousel-o": "4.0.0",
    "ngx-spinner": "9.0.2",
    "tinymce": "5.6.2",

## Installation
1. Install dependencies
```sh
npm i --save @ng-bootstrap/ng-bootstrap@6.0.2 @tinymce/tinymce-angular@4.2.0 angular-svg-icon@11.0.0 bootstrap@4.6.0 chart.js@2.9.3 ngx-color-picker@10.1.0 ngx-embed-video@1.0.4 ngx-image-cropper@3.1.9 ngx-infinite-scroll@10.0.0 ngx-owl-carousel-o@4.0.0 ngx-spinner@9.0.2 tinymce@5.6.2  
```
2. Install library `npm i @openchannel/angular-common-components`

3. Connect library styles by import in styles `@import "~@openchannel/angular-common-components/assets/styles/styles.scss";`
   or add it to angular json
```sh
  "build": {
    ...
    "styles": [
      ...
      "node_modules/@openchannel/angular-common-components/assets/styles/styles.scss"
    ],
  }
```
3. Connect library assets
```sh
  "assets": [
    {
      "glob": "**/*", "input": "node_modules/@openchannel/angular-common-components/assets/img",
      "output": "/assets/angular-common-components",
    },
  ]
 ```
4. Including TinyMCE within the Application, open angular.json and add TinyMCE to the assets property.
```sh
  "assets": [
     { "glob": "**/*", "input": "node_modules/tinymce", "output": "/tinymce/" }
  ]
 ```
5. To load TinyMCE when the page or application is loaded, open angular.json and add TinyMCE to the global scripts tag.
```sh
  "scripts": [
    "node_modules/tinymce/tinymce.min.js"
  ]
```

## Development

### Connect library to project

1. `ng build angular-common-components`

2. `cd ../../dist/angular-common-components`

5. `sudo npm link` Then copy result link.

4. In your angular project run:<br> `npm install file:<{absolute path to angular-common-components}/dist/angular-common-components>`

5. Import example (ts file):
   import { ComponentOrModel } from '@openchannel/angular-common-components/src/lib/common-components';
   
### Build Project with watching file changes
Run `ng build angular-common-components --watch`

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running tests
Run `npm run test`

### Package Project
Run `npm run angular-common-components-pack`

### Publish package version
Run `cd ./dist/angular-common-components && npm publish`

<!-- STORYBOOK -->
### Storybook

* Install npm dependencies

  ``npm install``

* Build Project

  ``ng build angular-common-components``

* Create doc for storybook

  ``npm run docs:json``

* Run Storybook

  ``npm run storybook``

Note:
* If you can't start the Storybook. Try to Update its version:
  ``npx sb@latest upgrade``

* If updating the storybook version did not help. Try this:
  ``npm run storybook-update-and-run``

<!-- USAGE EXAMPLES -->
## Usage

<!-- CONTACT -->
## Contact

Project Link: [https://bitbucket.org/openchannel/angular-template-libraries/src/master/projects/oc-ng-common-component/](https://bitbucket.org/openchannel/angular-template-libraries/src/master/projects/oc-ng-common-component/)
