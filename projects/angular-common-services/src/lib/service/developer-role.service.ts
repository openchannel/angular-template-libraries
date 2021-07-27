import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { HttpRequestService } from './http-request-services';
import { DeveloperRoleResponse } from '../model/api/account-role-model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting Developer Roles.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerRoles'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperRoleService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get Developer Roles list with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} pageLimit - (optional) Count user types into response. Starts from >= 1
     * @returns {Observable<Page<DeveloperRoleResponse | any>>} `Observable<Page<DeveloperRoleResponse | any>>`
     *
     * ### Example
     *
     * `getDeveloperRoles(1, 10)`
     */
    getDeveloperRoles(pageNumber?: number, pageLimit?: number): Observable<Page<DeveloperRoleResponse | any>> {
        return this.httpService.get(this.apiPaths.developerRoles, {
            params: new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(pageLimit)),
        });
    }
}
