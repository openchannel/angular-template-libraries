import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './service/http-request-services';
import { HttpXsrfExtractor, HttpXsrfInterceptor, XSRF_HEADER_NAME } from './xsrf/xsrf';
import { forIn, get } from 'lodash';
import { HttpRequestsWatcherInterceptor } from './interceptors/http-requests-watcher.interceptor';
import { PrerenderEndpointsConfig } from './model/api/prerender-endpoints-config.model';

export const API_URL = new InjectionToken<string>('API_URL');

interface OcEndpointApiPaths {
    globalPrefix: string;
    pathsWithoutGlobalPrefix: string[];
    forms: string;
    apps: string;
    appsVersions: string;
    appTypes: string;
    stats: string;
    authorization: string;
    authorizationNative: string;
    config: string;
    developer: string;
    developerAccounts: string;
    developerAccountTypes: string;
    developerRoles: string;
    developerTypes: string;
    files: string;
    frontEnd: string;
    invites: string;
    markets: string;
    ownership: string;
    properties: string;
    requests: string;
    reviews: string;
    userAccounts: string;
    userAccountTypes: string;
    userRoles: string;
    users: string;
    userTypes: string;
    sites: string;
}

/**
 * Class used for providing API paths data into module.
 */
export class OcApiPaths implements OcEndpointApiPaths {
    appTypes: string;
    apps: string;
    appsVersions: string;
    authorization: string;
    authorizationNative: string;
    config: string;
    developer: string;
    developerAccountTypes: string;
    developerAccounts: string;
    developerRoles: string;
    developerTypes: string;
    files: string;
    forms: string;
    frontEnd: string;
    globalPrefix: string;
    invites: string;
    markets: string;
    ownership: string;
    pathsWithoutGlobalPrefix: string[];
    properties: string;
    requests: string;
    reviews: string;
    stats: string;
    userAccountTypes: string;
    userAccounts: string;
    userRoles: string;
    userTypes: string;
    users: string;
    sites: string;
}

const ocEndpointApiPathsDefault: OcEndpointApiPaths = {
    globalPrefix: 'v2',
    pathsWithoutGlobalPrefix: ['authorization', 'authorizationNative'],
    forms: 'forms',
    apps: 'apps',
    appsVersions: 'apps',
    appTypes: 'appTypes',
    stats: 'stats',
    authorization: 'auth',
    authorizationNative: 'auth/native',
    config: 'config',
    developer: 'developers',
    developerAccounts: 'developerAccounts',
    developerAccountTypes: 'developerAccountTypes',
    developerRoles: 'developerRoles',
    developerTypes: 'developerTypes',
    files: 'files',
    frontEnd: 'frontEnd',
    invites: 'invites',
    markets: 'markets',
    ownership: 'ownership',
    properties: 'properties',
    requests: 'requests',
    reviews: 'reviews',
    userAccounts: 'userAccounts',
    userAccountTypes: 'userAccountTypes',
    userRoles: 'userRoles',
    users: 'users',
    userTypes: 'userTypes',
    sites: 'sites',
};

/**
 * Change default API service paths. Insert global prefix into API path.
 * (you can skip inserting this prefix, just put into pathsWithoutGlobalPrefix array field key.)
 *
 * @example Set and skip a global prefix
 * ``
 *  const apiPaths: OcEndpointApiPathsCustom = {
 *      globalPrefix: 'v3',
 *      pathsWithoutGlobalPrefix = ['forms'];
 *      apps: 'my/apps/path',
 *      stats = 'my/stats/path',
 *      forms = 'my/forms/path',
 *  };
 *
 *  // Output paths:
 *  // 'v3/my/apps/path',
 *  // 'v3/my/stats/path',
 *  // 'my/forms/path'
 *
 *  .@NgModule({
 *      imports: [
 *          OcCommonServiceModule.forRoot(apiUrl: 'https://my-api-url', customApiPaths: apiPaths),
 *      ]
 *  })
 *  export class AppModule {}
 */
export interface OcEndpointApiPathsCustom extends Partial<OcEndpointApiPaths> {
    globalPrefix: string;
}

@NgModule({
    imports: [HttpClientModule],
})
export class OcCommonServiceModule {
    static forRoot(
        apiUrlData: { apiUrl: string } | string,
        customApiPaths?: OcEndpointApiPathsCustom,
    ): ModuleWithProviders<OcCommonServiceModule> {
        return {
            ngModule: OcCommonServiceModule,
            providers: [
                HttpRequestService,
                {
                    provide: API_URL,
                    useValue: get(apiUrlData, 'apiUrl', apiUrlData),
                },
                {
                    provide: OcApiPaths,
                    useValue: OcCommonServiceModule.createEndpointApiPaths(customApiPaths),
                },
            ],
        };
    }

    private static createEndpointApiPaths(apiPathsCustom?: OcEndpointApiPathsCustom): OcApiPaths {
        const tempApiPathsConfig: OcEndpointApiPaths = { ...ocEndpointApiPathsDefault, ...(apiPathsCustom || {}) };

        const { globalPrefix, pathsWithoutGlobalPrefix = [], ...apiPaths } = tempApiPathsConfig;
        const apiPathsResult = new OcApiPaths();

        forIn(apiPaths, (apiPath: string, fieldName: string) => {
            // tslint:disable-next-line:prefer-conditional-expression
            if (globalPrefix && !pathsWithoutGlobalPrefix.includes(fieldName)) {
                apiPathsResult[fieldName] = `${globalPrefix}${apiPath ? '/' + apiPath : ''}`;
            } else {
                apiPathsResult[fieldName] = apiPath || '';
            }
        });
        return apiPathsResult;
    }
}

@NgModule({
    providers: [
        HttpXsrfInterceptor,
        { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfExtractor, multi: true },
        { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
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
                options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
                options.apiUrl ? { provide: API_URL, useValue: options.apiUrl } : [],
            ],
        };
    }
}

const defaultEndpoints: PrerenderEndpointsConfig = {
    excludeAPICall: [],
};

@NgModule({
    providers: [HttpRequestsWatcherInterceptor, { provide: HTTP_INTERCEPTORS, useExisting: HttpRequestsWatcherInterceptor, multi: true }],
})
export class NetlifyPrerenderModule {
    static withOptions(
        options: {
            endpointsConfigForPrerender?: PrerenderEndpointsConfig;
        } = {},
    ): ModuleWithProviders<NetlifyPrerenderModule> {
        return {
            ngModule: NetlifyPrerenderModule,
            providers: [
                {
                    provide: PrerenderEndpointsConfig,
                    useValue: options.endpointsConfigForPrerender ? options.endpointsConfigForPrerender : defaultEndpoints,
                },
            ],
        };
    }
}
