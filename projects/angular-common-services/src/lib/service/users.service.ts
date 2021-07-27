import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { HttpRequestService } from './http-request-services';
import { User, UserCompanyModel } from '../model/api/user.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { HttpHeaders } from '@angular/common/http';
import { TypeFieldModel, TypeModel } from '../model/api/type-model';
import { toString } from 'lodash';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting and modifying user model.<br>
 *
 * Documentation: <a href="https://support.openchannel.io/documentation/api/#439-users">Openchannel API</a><br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/users/all'<br>
 *
 * GET 'v2/users/this'<br>
 *
 * PATCH 'v2/users/this'<br>
 *
 * GET 'v2/userTypes/{type}'<br>
 *
 * GET 'v2/userTypes'<br>
 *
 */
@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get list of users by ids.
     *
     * @param {string[]} userIds - (optional) Array of strings (User Ids)
     * @returns {Observable<Page<User>>} Observable<Page<User>>
     *
     * ### Example
     *``
     * getUsersByIds(['a2sd876ags7dd6g','3v874hy98374vr93'])
     *``
     */
    getUsersByIds(userIds?: string[]): Observable<Page<User>> {
        const mainUrl = `${this.apiPaths.users}/all`;

        const dStr = userIds ? `['${userIds.join("','")}']` : '';
        const params = new OcHttpParams().append('query', `{'userId': {'$in': ${dStr}}}`);

        return this.httpService.get(mainUrl, { params });
    }

    /**
     *
     * Description: Get list of users with pagination.
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} limit - (optional) Count users into response. Starts from >= 1.
     * @returns {Observable<Page<User>>} Observable<Page<User>>
     *
     * ### Example
     *``
     * searchApp(1,100)
     *``
     */
    getUsers(pageNumber?: number, limit?: number): Observable<Page<User>> {
        const mainUrl = `${this.apiPaths.users}/all`;

        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit));

        return this.httpService.get(mainUrl, { params });
    }

    /**
     *
     * Description: Getting data about non-developer user's company
     *
     * @returns {Observable<UserCompanyModel>} Observable<UserCompanyModel>
     *
     * ### Example
     *``
     * getUserCompany()
     *``
     */
    getUserCompany(): Observable<UserCompanyModel> {
        return this.httpService.get(`${this.apiPaths.users}/this`);
    }
    /**
     *
     * Description: Saving data of non-developer user's company
     *
     * @param {any} companyData (required) new company fields data
     * @returns {Observable<any>} Observable<any>
     *
     * ### Example
     *``
     * updateUserCompany(any)
     *``
     */
    updateUserCompany(companyData: any): Observable<any> {
        return this.httpService.patch(`${this.apiPaths.users}/this`, companyData);
    }

    /**
     *
     * Description: Getting Fields definition for current user type
     *
     * @param {string} type (required) User Type
     * @param {any} httpOptions (optional)
     * @returns {Observable<any>} Observable<any>
     *
     * ### Example
     *``
     * getUserTypeDefinition('developer', {"Authorization": "Bearer aksjhdl123dlkjahslk123jhaslakjhalksj"})
     *``
     */
    getUserTypeDefinition(type: string, httpOptions?: any): Observable<any> {
        return this.httpService.get(`${this.apiPaths.userTypes}/${type}`, httpOptions);
    }

    /**
     *
     * Description: Get all user types with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
     * @param {number} pageLimit - (optional) Count user types into response. Starts from >= 1.
     * @param {string} sort - (optional) Sort user types by specific field.
     * @param {string} query - (optional) Your specific search query.
     * @param {HttpHeaders} headers - (optional)
     * @returns {Observable<Page<TypeModel<TypeFieldModel>>>} Observable<Page<TypeModel<TypeFieldModel>>>
     *
     * ### Example
     *``
     * getUserTypes(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}", {"Authorization": "Bearer aksjhdl123dlkjahslk123jhaslakjhalksj"})
     *``
     */
    getUserTypes(
        query?: string,
        sort?: string,
        pageNumber?: number,
        pageLimit?: number,
        headers?: HttpHeaders,
    ): Observable<Page<TypeModel<TypeFieldModel>>> {
        const options: any = {
            params: new OcHttpParams()
                .append('query', query)
                .append('sort', sort)
                .append('pageNumber', toString(pageNumber))
                .append('limit', toString(pageLimit)),
        };
        if (headers) {
            options.headers = headers;
        }
        return this.httpService.get(`${this.apiPaths.userTypes}`, options);
    }
}
