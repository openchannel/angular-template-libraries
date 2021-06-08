import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './service/http-request-services';
import { HttpXsrfExtractor, HttpXsrfInterceptor, XSRF_HEADER_NAME } from './xsrf/xsrf';
import { buildEndpointPathByConfig, OcApiPaths, OcEndpointApiPaths } from './config/api-version.model';
import { forIn } from 'lodash';

export const API_URL = new InjectionToken<string>('API_URL');

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    exports: [],
})
export class OcCommonServiceModule {
    static forRoot(options: { apiUrl: string; apiPaths?: OcEndpointApiPaths }): ModuleWithProviders<OcCommonServiceModule> {
        return {
            ngModule: OcCommonServiceModule,
            providers: [
                HttpRequestService,
                {
                    provide: API_URL,
                    useValue: options?.apiUrl,
                },
                {
                    provide: OcApiPaths,
                    useValue: OcCommonServiceModule.createApiPaths(options?.apiPaths),
                },
            ],
        };
    }

    private static createApiPaths(apiPaths: OcEndpointApiPaths = new OcEndpointApiPaths()): OcApiPaths {
        const moduleApiPaths = new OcApiPaths();
        const prefix = apiPaths.globalPrefix;
        forIn(apiPaths, (value, key) => (moduleApiPaths[key] = buildEndpointPathByConfig(prefix, value)));
        return moduleApiPaths;
    }
}

@NgModule({
    providers: [
        HttpXsrfInterceptor,
        {provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfExtractor, multi: true},
        {provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN'},
    ],
})
export class CustomHttpClientXsrfModule {
    static withOptions(
        options: {
            headerName?: string;
            apiUrl?: string;
        } = {},
    ): ModuleWithProviders<CustomHttpClientXsrfModule> {
        return {
            ngModule: CustomHttpClientXsrfModule,
            providers: [
                options.headerName ? {provide: XSRF_HEADER_NAME, useValue: options.headerName} : [],
                options.apiUrl ? {provide: API_URL, useValue: options.apiUrl} : [],
            ],
        };
    }
}
