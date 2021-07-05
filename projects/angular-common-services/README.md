# angular-common-services

* [angular-common-services](#angular-common-services)
  * [Built with](#services-built-with)
  * [Dependencies](#services-dependencies)
  * [Installation](#services-installation)
  * [Development](#services-development)
  * [Usage](#services-usage)
  * [Contact](#services-contact)
  
### Services Built With
* [Angular 11.2.3](https://angular.io)

## About the library
Store models and services for creating a marketplace instance:
* API services.
  - user authorization.
  - marketplace endpoints.
* Models :
  - request and response models.
* Utils:
  - CSRF interceptor. Syncs CSRF token between pages.
  
## Services Dependencies

    "jwt-decode": "3.1.2",
    "broadcast-channel": "3.5.3",

## Services Installation

1. Install dependencies
```sh
  npm i --save jwt-decode@3.1.2 broadcast-channel@3.5.3
```
2. Install library `npm i @openchannel/angular-common-services`

### Import OcCommonServiceModule
Note: OcCommonServiceModule provide API services.  
Add import to app.module
```sh
@NgModule({
    imports: [
        ...
        OcCommonServiceModule.forRoot({apiUrl: 'main api path for all API services'}),
    ]
})
export class AppModule {}
```

Example:
```
   OcCommonServiceModule.forRoot({apiUrl: 'https://client-api.openchannel.io/'})
```

### Import CustomHttpClientXsrfModule
Note: CustomHttpClientXsrfModule provide CSRF intercepors. 
Interceptors take CSRF response header, then put it into memory storage and insert
this header for all requests by this API URL.

Add import to app.module
```sh
@NgModule({
    imports: [
        ...
       CustomHttpClientXsrfModule.withOptions({ headerName: 'X-CSRF-TOKEN', apiUrl: 'main api path for all API calls' }),
    ]
})
export class AppModule {}
```
Example:  
```
CustomHttpClientXsrfModule.withOptions({ headerName: 'X-CSRF-TOKEN', apiUrl: 'https://client-api.openchannel.io/' })
```

## Connect library to project by link
Note: Run commands from the root directory.
1. `npm i`
   
2. `ng build angular-common-services --watch`

3. `cd ./dist/angular-common-services`

4. `sudo npm link` Then copy result link.
   * Example:
     * Command Result (sudo npm link):  
    `/usr/local/lib/node_modules/@openchannel/angular-common-services -> /home/user/git/angular-template-libraries/dist/angular-common-services`
      * Copy link: `/home/user/git/angular-template-libraries/dist/angular-common-services`
5. In your angular project run:<br> `npm install file:{absolute path to angular-common-services or copied path}/dist/angular-common-services`
   * Example:
   `npm install file:/home/user/git/angular-template-libraries/dist/angular-common-services`
    
6. Use imports into ts files :  
`
import { CustomHttpClientXsrfModule } from '@openchannel/angular-common-services';
`
