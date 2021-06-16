import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class DeveloperAccountTypesService {

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getAccountType(type: string, httpOptions?: any): Observable<any> {
        return this.httpService.get(`${this.apiPaths.developerAccountTypes}/${type}`, httpOptions);
    }

    getAllDeveloperAccountsType(pageNumber: number, limit: number, query?: string): Observable<Page<any>> {
        const params = new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)).append('query', query);

        return this.httpService.get(this.apiPaths.developerAccountTypes, { params });
    }
}
