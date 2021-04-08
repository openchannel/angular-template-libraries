# OcAngularTemplate

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Storybook](#storybook)
* [Usage](#usage)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

This project store elastic patterns for many components 
(buttons, text area, inputs, dropdowns, tags, and another). 
Every component you can customize by your style. 

### Built With
* [Angular](https://angular.io) v. 11.2.3
* [Bootstrap](https://getbootstrap.com) v. 4.4.1
* [Storybook](https://storybook.js.org/) v. 6.1.20

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

### Installation (creating global link)
1. `npm install`

2. Optional. If need connect oc-ng-common-service.<br> `npm install file:<absolute path to common service project dist/oc-ng-common-service>`

3. `ng build oc-ng-common-component`

4. `cd dist/oc-ng-common-component`

5. `sudo npm link` Then copy result link. 

## Start components service

1. `npm install`  

2. `ng build oc-ng-common-component`

3. `npm run oc-ng-common-component`

## Build Project with logging
Run `ng build oc-ng-common-component --watch`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running tests

Run `npm run test:lib`

## Angular CLI help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Upgrade Storybook 
Run `npx sb@next upgrade --prerelease`

## Up package version
Run `npm run oc-ng-common-component-up-version`

## Package Project
Run `npm run oc-ng-common-component-pack`

## Publish package version
Run `cd ./dist/oc-ng-common-component && npm publish`

<!-- STORYBOOK -->
# Storybook

* Install npm dependencies

  ``npm install``


* Run Storybook

  ``npm run storybook``

Note: 
* When you can't start the Storybook. Try Update his version:
  ``npx sb@latest upgrade``

* When updating the storybook version did not help. Try this:
  ``npm run storybook-update-and-run``
   
Usage :
   * Open [http://localhost:6006](http://localhost:6006)
   * [Document](https://storybook.js.org/docs/react/get-started/introduction) : about storybook.
   * [Document](https://storybook.js.org/docs/react/essentials/controls) : changing incoming parameters for a component. 
   * [Document](https://storybook.js.org/docs/react/get-started/introduction) : tutorials.

<!-- USAGE EXAMPLES -->
## Usage

<!-- CONTACT -->
## Contact

Project Link: [https://bitbucket.org/openchannel/angular-common-components/src/develop/](https://bitbucket.org/openchannel/angular-common-components/src/develop/)
