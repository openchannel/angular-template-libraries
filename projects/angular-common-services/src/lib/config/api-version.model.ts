export interface OcEndpointPathConfig {
    prefix?: string;
    path: string;
}

/**
 * Config with basic paths for all API calls.
 * OcEndpointApiPaths.globalPrefix - used for inserting this prefix for all endpoints
 * (you can skip inserting this prefix, just set this prefix before basic path)
 *
 * @example Set and skip a global prefix
 *
 *  const apiPaths = new OcEndpointApiPaths();
 *  apiPaths.globalPrefix = 'v4';
 *  apiPaths.apps = 'my/apps/path'; // result => 'v2/my/apps/path'
 *  apiPaths.stats = 'my/stats/path'; // result => 'v2/my/stats/path'
 *  apiPaths.forms = 'v4/my/forms/path'; // result => 'my/forms/path'
 *
 */
export class OcEndpointApiPaths {
    globalPrefix: string = 'v2';
    forms: string = 'forms';
    apps: string = 'apps';
    appsVersions: string = 'apps';
    appTypes: string = 'appTypes';
    stats: string = 'stats';
    authorization: string = 'v2/auth'; // For this endpoint removes the global prefix
    authorizationNative: string = 'auth/native';
    config: string = 'config';
    developer: string = 'developers';
    developerAccounts: string = 'developerAccounts';
    developerAccountTypes: string = 'developerAccountTypes';
    developerRoles: string = 'developerRoles';
    developerTypes: string = 'developerTypes';
    files: string = 'files';
    frontEnd: string = 'frontEnd';
    invites: string = 'invites';
    markets: string = 'markets';
    ownership: string = 'ownership';
    properties: string = 'properties';
    requests: string = 'requests';
    reviews: string = 'reviews';
    userAccounts: string = 'userAccounts';
    userAccountTypes: string = 'userAccountTypes';
    userRoles: string = 'userRoles';
    users: string = 'users';
    userTypes: string = 'userTypes';
}

export class OcApiPaths extends OcEndpointApiPaths {}

export function buildEndpointPathByConfig(prefix: string = '', path: string = ''): string {
    const paths: string[] = [];
    if (prefix && path.startsWith(prefix)) {
        paths.push(...(path.substring(prefix.length)?.split('/') || []));
    } else {
        paths.push(...(prefix.split('/') || []));
        paths.push(...(path.split('/') || []));
    }
    return paths.filter(part => part).join('/');
}
