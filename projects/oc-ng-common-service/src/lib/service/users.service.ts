import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {User, UserCompanyModel} from '../model/api/user.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    private readonly USERS_URL = 'v2/users';
    private readonly USER_TYPE_URL = 'v2/userTypes';

    constructor(private httpService: HttpRequestService) {
    }

    getUsersByIds(userIds: string[]): Observable<Page<User>> {
        const mainUrl = `${this.USERS_URL}/all`;

        const dStr = userIds ? `['${userIds.join('\',\'')}']` : '';
        const params = new OcHttpParams()
          .append('query', `{'userId': {'$in': ${dStr}}}`);

        return this.httpService.get(mainUrl, { params });
    }

    getUsers(pageNumber: number, limit: number): Observable<Page<User>> {
        const mainUrl = `${this.USERS_URL}/all`;

        const params = new OcHttpParams()
          .append('pageNumber', String(pageNumber))
          .append('limit', String(limit));

        return this.httpService.get(mainUrl, { params });
    }

    /**
     * Getting data about non-developer user's company
     */
    getUserCompany(): Observable<UserCompanyModel> {
        return this.httpService.get(`${this.USERS_URL}/this`);
    }
    /**
     * Saving data of non-developer user's company
     * @param companyData new company fields data
     */
    updateUserCompany(companyData: any): Observable<any> {
        return this.httpService.patch(`${this.USERS_URL}/this`, companyData);
    }

    /**
     * Getting Fields definition for current user type
     * @param type user type
     */
    getUserTypeDefinition(type: string): Observable<any> {
        return this.httpService.get(`${this.USER_TYPE_URL}/${type}`);
    }
}
