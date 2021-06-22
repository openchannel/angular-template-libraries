import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';

/**

 * Description: API service for getting User Account Type model.<br>

 * Endpoints:<br>

 * GET 'v2/developerAccountTypes'<br>

 * GET 'v2/developerAccountTypes/{type}'<br>

 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountTypesService {
    private readonly DEVELOPER_ACCOUNTS_TYPES_URL = 'v2/developerAccountTypes';

    constructor(private httpService: HttpRequestService) {}

    /**
     *
     * Description: Get Developer account type data
     *
     * @param {string} type
     * @param {any} httpOptions
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `getAccountType('type', {headers: {Authorization: 'Bearer a8yshd89a7hsd87ha98d7s'}}});`
     */
    getAccountType(type: string, httpOptions?: any): Observable<any> {
        return this.httpService.get(`${this.DEVELOPER_ACCOUNTS_TYPES_URL}/${type}`, httpOptions);
    }

    /**
     *
     * Description: Get Developer account types list with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
     * @param {number} limit - (optional) Count Developer Account Types into response. Starts from >= 1.
     * @param {string} filter - (optional) Your specific search filter.
     * @returns {Observable<Page<any>>} `Observable<Page<any>>`
     *
     * * ### Example:
     *
     * `getAllDeveloperAccountsType(1, 10, "{"name": {"$in":["first", "second"]}}");`
     */
    getAllDeveloperAccountsType(pageNumber?: number, limit?: number, query?: string): Observable<Page<any>> {
        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)).append('query', query);

        return this.httpService.get(this.DEVELOPER_ACCOUNTS_TYPES_URL, { params });
    }
}
