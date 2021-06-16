import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { AppResponse, AppStatusValue, CreateAppModel, PublishAppVersionModel } from '../model/api/app-data-model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class AppsService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    searchApp(searchText: string, filter: string, fields: string[] = ['name']): Observable<Page<AppResponse | any>> {
        const mainUrl = `${this.apiPaths.apps}/textSearch`;

        let params = new OcHttpParams().append('fields', JSON.stringify(fields)).appendRequiredParam('text', searchText, '');
        if (filter) {
            params = params.append('query', filter);
        }

        return this.httpRequest.get(mainUrl, { params });
    }

    getApps(pageNumber: number, limit: number, sort: any, query: any, isOwner: boolean = false): Observable<Page<AppResponse | any>> {
        const params = new OcHttpParams()
            .append('sort', sort)
            .append('query', query)
            .append('isOwner', String(isOwner))
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit));

        return this.httpRequest.get(this.apiPaths.apps, { params });
    }

    getAppBySafeName(appSafeName: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.apiPaths.apps}/bySafeName/${appSafeName}`);
    }

    createApp(createAppRequest: CreateAppModel): Observable<AppResponse> {
        return this.httpRequest.post(this.apiPaths.apps, createAppRequest);
    }

    // empty response
    deleteApp(appId: string): Observable<any> {
        return this.httpRequest.delete(`${this.apiPaths.apps}/${appId}`);
    }

    // empty response
    publishAppByVersion(appId: string, publishAppVersionModel: PublishAppVersionModel): Observable<any> {
        const mainUrl = `${this.apiPaths.apps}/${appId}/publish`;
        return this.httpRequest.post(mainUrl, publishAppVersionModel);
    }

    getAppById(id: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.apiPaths.apps}/${id}`);
    }

    changeAppStatus(appId: string, version: number, status: AppStatusValue, reason?: string): Observable<any> {
        const mainUrl = `${this.apiPaths.apps}/${appId}/versions/${version}/status`;
        const body = {
            status,
            reason: reason ? reason : '',
        };

        return this.httpRequest.post(mainUrl, body);
    }
}
