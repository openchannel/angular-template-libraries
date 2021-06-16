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

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getUsersByIds(userIds: string[]): Observable<Page<User>> {
        const mainUrl = `${this.apiPaths.users}/all`;

        const dStr = userIds ? `['${userIds.join("','")}']` : '';
        const params = new OcHttpParams().append('query', `{'userId': {'$in': ${dStr}}}`);

        return this.httpService.get(mainUrl, { params });
    }

    getUsers(pageNumber: number, limit: number): Observable<Page<User>> {
        const mainUrl = `${this.apiPaths.users}/all`;

        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit));

        return this.httpService.get(mainUrl, { params });
    }

    /**
     * Getting data about non-developer user's company
     */
    getUserCompany(): Observable<UserCompanyModel> {
        return this.httpService.get(`${this.apiPaths.users}/this`);
    }
    /**
     * Saving data of non-developer user's company
     * @param companyData new company fields data
     */
    updateUserCompany(companyData: any): Observable<any> {
        return this.httpService.patch(`${this.apiPaths.users}/this`, companyData);
    }

    /**
     * Getting Fields definition for current user type
     * @param type user type
     */
    getUserTypeDefinition(type: string, httpOptions?: any): Observable<any> {
        return this.httpService.get(`${this.apiPaths.userTypes}/${type}`, httpOptions);
    }

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
