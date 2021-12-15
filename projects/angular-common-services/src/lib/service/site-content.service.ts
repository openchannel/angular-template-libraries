import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { SecuritySettingsResponse, SiteContentResponse } from '../model/api/custom-content.model';
import { HttpHeaders } from '@angular/common/http';
import { OcApiPaths } from '../oc-ng-common-service.module';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { Page } from '../model/api/page.model';

@Injectable({
    providedIn: 'root',
})
export class SiteContentService {

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

    getAllContent(
        pageNumber: number,
        limit: number,
        sort: string,
        query: string,
        headers: HttpHeaders = new HttpHeaders(),
    ): Observable<Page<SiteContentResponse>> {

        return this.httpService.get(`${this.apiPaths.sites}/content`, {
            headers,
            params: new OcHttpParams()
                .append('pageNumber', String(pageNumber))
                .append('limit', String(limit))
                .append('sort', sort)
                .append('query', query),
        });
    }

    /**
     * Return site security setting configured on the OpenChannel dashboard.
     */
    getSecuritySettings(): Observable<SecuritySettingsResponse> {
        return this.httpService.get(`${this.apiPaths.sites}/security-settings`);
    }
}
