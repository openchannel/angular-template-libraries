import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { DeveloperAccount } from '../model/api/developer-account.model';
import { DeveloperAccountModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountService {
    private DEVELOPER_ACCOUNTS_URL;

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
        this.DEVELOPER_ACCOUNTS_URL = apiPaths.developerAccounts;
    }

    getAccount(): Observable<DeveloperAccount> {
        return this.httpService.get(`${this.DEVELOPER_ACCOUNTS_URL}/this`);
    }

    updateAccountFields(body: any): Observable<DeveloperAccount> {
        return this.httpService.patch(`${this.DEVELOPER_ACCOUNTS_URL}/this`, body);
    }

    updateAccountFieldsForAnotherUser(developerAccountId: string, skipTypeValidation: boolean, body: any): Observable<DeveloperAccount> {
        const mainUrl = `${this.DEVELOPER_ACCOUNTS_URL}/${developerAccountId}`;

        const params = new OcHttpParams().append('skipTypeValidators', String(skipTypeValidation));

        return this.httpService.patch(mainUrl, body, { params });
    }

    getDeveloperAccounts(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<DeveloperAccountModel>> {
        const mainUrl = `${this.DEVELOPER_ACCOUNTS_URL}/all`;

        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('sort', sort)
            .append('query', query);

        return this.httpService.get(mainUrl, { params });
    }

    deleteDeveloperAccount(developerAccountId: string): Observable<any> {
        return this.httpService.delete(`${this.DEVELOPER_ACCOUNTS_URL}/${developerAccountId}`);
    }

    deleteCurrentDeveloperAccount(): Observable<any> {
        return this.httpService.delete(`${this.DEVELOPER_ACCOUNTS_URL}/this`);
    }
}
