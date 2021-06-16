import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { DeveloperAccount } from '../model/api/developer-account.model';
import { DeveloperAccountModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountService {

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getAccount(): Observable<DeveloperAccount> {
        return this.httpService.get(`${this.apiPaths.developerAccounts}/this`);
    }

    updateAccountFields(body: any): Observable<DeveloperAccount> {
        return this.httpService.patch(`${this.apiPaths.developerAccounts}/this`, body);
    }

    updateAccountFieldsForAnotherUser(developerAccountId: string, skipTypeValidation: boolean, body: any): Observable<DeveloperAccount> {
        const mainUrl = `${this.apiPaths.developerAccounts}/${developerAccountId}`;

        const params = new OcHttpParams().append('skipTypeValidators', String(skipTypeValidation));

        return this.httpService.patch(mainUrl, body, { params });
    }

    getDeveloperAccounts(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<DeveloperAccountModel>> {
        const mainUrl = `${this.apiPaths.developerAccounts}/all`;

        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('sort', sort)
            .append('query', query);

        return this.httpService.get(mainUrl, { params });
    }

    deleteDeveloperAccount(developerAccountId: string): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.developerAccounts}/${developerAccountId}`);
    }

    deleteCurrentDeveloperAccount(): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.developerAccounts}/this`);
    }
}
