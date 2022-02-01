import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { Page } from '../model/api/page.model';
import { DeveloperAccountTypeModel } from '../model/api/user-type.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting User Account Type model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerAccountTypes'<br>
 *
 * GET 'v2/developerAccountTypes/{type}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountTypesService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    /**
     *
     * Description: Get Developer account type data
     *
     * @param {string} type
     * @param {any} httpOptions
     * @returns {Observable<DeveloperAccountTypeModel>} `Observable<DeveloperAccountTypeModel>`
     *
     * ### Example
     *
     * `getAccountType('type', {headers: {Authorization: 'Bearer a8yshd89a7hsd87ha98d7s'}}});`
     */
    getAccountType(type: string, httpOptions?: any): Observable<DeveloperAccountTypeModel> {
        return this.httpService.get(`${this.apiPaths.developerAccountTypes}/${type}`, httpOptions);
    }

    /**
     *
     * Description: Get Developer account types list with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
     * @param {number} limit - (optional) Count Developer Account Types into response. Starts from >= 1.
     * @param {string} query - (optional) Your specific search query.
     * @returns {Observable<Page<DeveloperAccountTypeModel>>} `Observable<Page<DeveloperAccountTypeModel>>`
     *
     * ### Example
     *
     * `getAllDeveloperAccountsType(1, 10, "{"name": {"$in":["first", "second"]}}");`
     */
    getAllDeveloperAccountsType(pageNumber?: number, limit?: number, query?: string): Observable<Page<DeveloperAccountTypeModel>> {
        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)).append('query', query);

        return this.httpService.get(this.apiPaths.developerAccountTypes, { params });
    }
}
