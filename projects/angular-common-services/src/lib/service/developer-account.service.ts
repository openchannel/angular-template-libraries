import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { DeveloperAccount } from '../model/api/developer-account.model';
import { DeveloperAccountModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting and modifying User Account model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerAccounts/all'<br>
 *
 * GET 'v2/developerAccounts/this'<br>
 *
 * PATCH 'v2/developerAccounts/this'<br>
 *
 * DELETE 'v2/developerAccounts/this'<br>
 *
 * PATCH 'v2/developerAccounts/{developerAccountId}'<br>
 *
 * DELETE 'v2/developerAccounts/{developerAccountId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get developer account data
     *
     * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
     *
     * ### Example
     *
     * `getAccount();`
     */
    getAccount(): Observable<DeveloperAccount> {
        return this.httpService.get(`${this.apiPaths.developerAccounts}/this`);
    }

    /**
     *
     * Description: Update developer account fields
     *
     * @param {Partial<DeveloperAccount>} body - Data to update
     * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
     *
     * ### Example
     *
     * `getAccount({name: 'Developer'});`
     */
    updateAccountFields(body: Partial<DeveloperAccount>): Observable<DeveloperAccount> {
        return this.httpService.patch(`${this.apiPaths.developerAccounts}/this`, body);
    }

    /**
     *
     * Description: Update developer account to specific user
     *
     * @param {string} developerAccountId
     * @param {string} skipTypeValidation
     * @param {Partial<DeveloperAccount>} body
     * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
     *
     * ### Example
     *
     * `updateAccountFieldsForAnotherUser('ga7s6dg7a6sgd876ags7d8', false, {name: 'Developer'});`
     */
    updateAccountFieldsForAnotherUser(developerAccountId: string, skipTypeValidation: boolean, body: Partial<DeveloperAccount>): Observable<DeveloperAccount> {
        const mainUrl = `${this.apiPaths.developerAccounts}/${encodeURIComponent(developerAccountId)}`;

        const params = new OcHttpParams().append('skipTypeValidators', String(skipTypeValidation));

        return this.httpService.patch(mainUrl, body, { params });
    }

    /**
     *
     * Description: Get list of developer accounts with pagination
     *
     * @param {number} page - (optional) Current page index. Starts from >= 1.
     * @param {number} limit - (optional) Count Developer Accounts into response. Starts from >= 1.
     * @param {string} sort - (optional) Sort Developer Accounts by specific field.
     * @param {string} filter - (optional) Your specific search filter.
     * @returns {Observable<Page<DeveloperAccountModel>>} `Observable<Page<DeveloperAccountModel>>`
     *
     * ### Example
     *
     * `getDeveloperAccounts(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}");`
     */
    getDeveloperAccounts(pageNumber?: number, limit?: number, sort?: string, query?: string): Observable<Page<DeveloperAccountModel>> {
        const mainUrl = `${this.apiPaths.developerAccounts}/all`;

        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('sort', sort)
            .append('query', query);

        return this.httpService.get(mainUrl, { params });
    }

    /**
     *
     * Description: Find developer account by id and delete
     *
     * @param {string} developerAccountId
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `deleteDeveloperAccount('97agsd986ags9d86g');`
     */
    deleteDeveloperAccount(developerAccountId: string): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.developerAccounts}/${encodeURIComponent(developerAccountId)}`);
    }

    /**
     *
     * Description: Delete current developer account
     *
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `deleteCurrentDeveloperAccount();`
     */
    deleteCurrentDeveloperAccount(): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.developerAccounts}/this`);
    }
}
