import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountTypesService {
    private DEVELOPER_ACCOUNTS_TYPES_URL;

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
        this.DEVELOPER_ACCOUNTS_TYPES_URL = apiPaths.developerAccountTypes;
    }

    getAccountType(type: string, httpOptions?: any): Observable<any> {
        return this.httpService.get(`${this.DEVELOPER_ACCOUNTS_TYPES_URL}/${type}`, httpOptions);
    }

    getAllDeveloperAccountsType(pageNumber: number, limit: number, query?: string): Observable<Page<any>> {
        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)).append('query', query);

        return this.httpService.get(this.DEVELOPER_ACCOUNTS_TYPES_URL, { params });
    }
}
