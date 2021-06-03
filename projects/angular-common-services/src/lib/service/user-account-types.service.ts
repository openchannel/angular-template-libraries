import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { UserAccountTypeModel } from '../model/api/user-type.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';

/**

 * Description: API service for getting User Account Types.<br>

 * Endpoints:<br>

 * GET 'v2/userAccountTypes/{type}'<br>

 * GET 'v2/userAccountTypes'<br>


 */
@Injectable({
    providedIn: 'root',
})
export class UserAccountTypesService {
    private readonly BASE_USER_ACCOUNTS_TYPES = 'v2/userAccountTypes';

    constructor(private httpService: HttpRequestService) {}

    /**
     * 
     * Description: Getting user profile fields definition by type
     * 
     * @param {string} type - (required) type from the user account data
     * @param {any} httpOptions - (optional)
     * @returns {Observable<UserAccountTypeModel>} Observable<UserAccountTypeModel>
     * 
     * * ### Example:
     *``
     * getUserAccountType("developer", {"Authorization": "Bearer o8ahsd89has08dha08s7dh"})
     *``
     */
    getUserAccountType(type: string, httpOptions?: any): Observable<UserAccountTypeModel> {
        return this.httpService.get(`${this.BASE_USER_ACCOUNTS_TYPES}/${type}`, httpOptions);
    }
    /**
     * 
     * Description: Get accoung types list with pagination
     * 
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
     * @param {number} limit - (optional) Count types into response. Starts from >= 1.
     * @param {string} query - (optional) Your specific search query.
     * @returns {Observable<Page<UserAccountTypeModel>>} Observable<Page<UserAccountTypeModel>>
     * 
     * * ### Example:
     *``
     * getUserAccountTypes(1,10,"{"name": {"$in":["first", "second"]}}")
     *``
     */
    getUserAccountTypes(pageNumber?: number, limit?: number, query?: string): Observable<Page<UserAccountTypeModel>> {
        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)).append('query', query);

        return this.httpService.get(this.BASE_USER_ACCOUNTS_TYPES, { params });
    }
}
