# angular-common-components

* [angular-common-components](#angular-common-componentss)
  * [About the library](#about-the-library)
  * [Built with](#built-with)
  * [Dependencies](#dependencies)
  * [Installation](#installation)
  * [Storybook](#storybook)
  * [Development](#development)
  * [Usage](#usage)
  * [Contact](#contact)
  

# About the library

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

## Built With
* [Angular](https://angular.io) v. 11.2.3
* [Bootstrap](https://getbootstrap.com) v. 4.4.1
* [Storybook](https://storybook.js.org/) v. 6.1.20

## Dependencies
    "@ng-bootstrap/ng-bootstrap": "6.0.2",
    "@tinymce/tinymce-angular": "4.2.0",
    "angular-svg-icon": "11.0.0",
    "bootstrap": "4.6.0",
    "chart.js": "3.3.2",
    "ngx-color-picker": "10.1.0",
    "ngx-embed-video": "1.0.4",
    "ngx-image-cropper": "3.1.9",
    "ngx-infinite-scroll": "10.0.0",
    "ngx-owl-carousel-o": "4.0.0",
    "ngx-spinner": "9.0.2",
    "tinymce": "5.6.2",

## Installation

Before installation please check **required libs** [README.md](../../README.md#required-libs)

1. Install dependencies
```sh
npm i --save @ng-bootstrap/ng-bootstrap@6.0.2 @tinymce/tinymce-angular@4.2.0 angular-svg-icon@11.0.0 bootstrap@4.6.0 chart.js@3.3.2 ngx-color-picker@10.1.0 ngx-embed-video@1.0.4 ngx-image-cropper@3.1.9 ngx-infinite-scroll@10.0.0 ngx-owl-carousel-o@4.0.0 ngx-spinner@9.0.2 tinymce@5.6.2  
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
6. For the File Uploader component should be created a service which extends `FileUploaderService`.
Service must consist two function `fileUploadRequest` and `fileDetailsRequest` which  should return your requests to CAP
   Example of service:
```sh
@Injectable()
export class FileService extends FileUploaderService {
    constructor(private fileUploaderService: FileUploadDownloadService) {
        super();
    }

    fileUploadRequest(
        file: FormData,
        isPrivate: boolean,
        hash?: string[],
    ): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
        return this.fileUploaderService.uploadToOpenChannel(file, isPrivate, hash);
    }

    fileDetailsRequest(fileId: string): Observable<FileDetails> {
        return this.fileUploaderService.downloadFileDetails(fileId);
    }
}
```
`FileUploaderService` should be provided in `AppModule`:
```sh
@NgModule({
    imports: [
        ...
        OcFormComponentsModule,
    ],
    providers: [
        { provide: FileUploaderService, useClass: FileService },
    ]
})
export class AppModule {}
```

7. Error messages for all forms. Have default implementation DefaultErrorMessageConfiguration.
```sh
@NgModule({
    providers: [
        { provide: AbstractErrorMessageConfiguration, useValue: new DefaultErrorMessageConfiguration() },
    ],
    bootstrap: [AppComponent],
    entryComponents: [],
})
export class AppModule {}
```
If you want to update error messages follow this example:
```sh
import {
    AbstractErrorMessageConfiguration,
    DefaultErrorMessageConfiguration,
} from '@openchannel/angular-common-components/src/lib/common-components';

class CustomErrorMessageConfiguration extends DefaultErrorMessageConfiguration {
    constructor() {
        super(
            {
                # default field errors
                required: () => '(default) Please fill out this field.',
            },
            {
                # default server errors              
                defaultMessageHandler: () => '(custom) Server error.',
                email_is_incorrect: () => '(custom) Email is incorrect.',
            },
            {
                # your custom form     
                MY_FIRST_FORM: {
                    specificFields: [
                        {
                            # field from current form
                            fieldPath: 'text-id',
                            fieldValidators: {
                                # override previous error message 
                                required: () => '(custom) (MY_FIRST_FORM) Please fill out this field',
                            },
                        },
                    ],
                },
                # your custom form
                MY_SECOND_FORM: {
                    specificFields: [
                        {
                            fieldPath: 'text-id',
                            fieldValidators: {
                                required: () => '(custom) (MY_SECOND_FORM) Please fill out this field',
                            },
                        },
                    ],
                },
                # this form from library
                login: {
                    specificFields: [
                        {
                            fieldPath: 'email',
                            fieldValidators: {
                                required: () => '(custom) Email is required field.',
                            },
                        },
                    ],
                },
            },
        );
    }
}

@NgModule({
    providers: [
        { provide: AbstractErrorMessageConfiguration, useClass: CustomErrorMessageConfiguration },
    ],
    bootstrap: [AppComponent],
    entryComponents: [],
})
export class AppModule {}


# Your component (ts)
@Component({
  ...
})
export class YourComponent  {
    formJsonData: Partial<AppFormField> = {
        fields: [
            {
                id: 'text-id',
                type: 'text',
                label: 'My text label',
                attributes: {
                    required: true,
                },
            },
        ],
    };
}

# Your component (html)
<div class="my-forms">
  <!-- default login form, already have ID 'login' -->
  <oc-login></oc-login>

  <!--  your custom form, with ID 'MY_FIRST_FORM' -->
  <oc-form formId="MY_FIRST_FORM" [formJsonData]="formJsonData"></oc-form>

  <!--  your custom form with ID 'MY_SECOND_FORM'-->
  <oc-form formId="MY_SECOND_FORM" [formJsonData]="formJsonData"> </oc-form>
</div>
```

### Connect library to project
Note: Run commands from the root directory.

1. 'npm i'  
   
2. `ng build angular-common-components` or `ng build angular-common-components --watch` 
   (Note: Flag '--watch' rebuild project after any changes.)

3. `cd ./dist/angular-common-components`

4. `sudo npm link` Then copy result link.

5. In your angular project run:<br> `npm install file:{absolute path to angular-common-components}/dist/angular-common-components`

6. Import example (ts file):
   import { ComponentOrModel } from '@openchannel/angular-common-components/src/lib/common-components';
   
### Running tests
Run `npm run test`

### Package Project
Run `npm run angular-common-components-pack`

### Publish package version
Run `cd ./dist/angular-common-components && npm publish`

<!-- STORYBOOK -->
### Storybook

* Install npm dependencies

  ``npm i``

* Build Project

  ``ng build angular-common-components --watch``

* Create doc for storybook

  ``npm run docs:json``

* Run Storybook

  ``npm run storybook``

Note:
* If you can't start the Storybook. Try to Update its version:
  ``npx sb@latest upgrade``

* If updating the storybook version did not help. Try this:
  ``npm run storybook-update-and-run``
