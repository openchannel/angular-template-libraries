import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {
    AppResponse,
    AppStatusValue,
    CreateAppModel,
    PublishAppVersionModel
} from '../model/api/app-data-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
    providedIn: 'root'
})
export class AppsService {

    private readonly APPS_URL = 'v2/apps';

    constructor(private httpRequest: HttpRequestService) {}

    searchApp(searchText: string, filter: string, fields: string[] = ['name']): Observable<Page<AppResponse>> {
        const mainUrl = `${this.APPS_URL}/textSearch`;

        let params = new OcHttpParams()
          .append('fields', JSON.stringify(fields))
          .appendRequiredParam('text', searchText, '');
        if (filter) {
            params = params.append('query', filter);
        }

        return this.httpRequest.get(mainUrl, { params });
    }

    getApps(pageNumber: number, limit: number, sort: any, query: any, isOwner: boolean = false): Observable<Page<AppResponse>> {
        const params = new OcHttpParams()
          .append('sort', sort)
          .append('query', query)
          .append('isOwner', String(isOwner))
          .append('pageNumber', String(pageNumber))
          .append('limit', String(limit));

        return this.httpRequest.get(this.APPS_URL, { params });
    }

    getAppBySafeName(appSafeName: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.APPS_URL}/bySafeName/${appSafeName}`);
    }

    createApp(createAppRequest: CreateAppModel): Observable<AppResponse> {
        return this.httpRequest.post(this.APPS_URL, createAppRequest);
    }

    // empty response
    deleteApp(appId: string): Observable<any> {
        return this.httpRequest.delete(`${this.APPS_URL}/${appId}`);
    }

    // empty response
    publishAppByVersion(appId: string, publishAppVersionModel: PublishAppVersionModel): Observable<any> {
        const mainUrl = `${this.APPS_URL}/${appId}/publish`;
        return this.httpRequest.post(mainUrl, publishAppVersionModel);
    }

    getAppById(id: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.APPS_URL}/${id}`);
    }

    changeAppStatus(appId: string, version: number, status: AppStatusValue, reason?: string): Observable<any> {
        const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}/status`;
        const body = {
          status,
          reason: reason ? reason : ''
        };

        return this.httpRequest.post(mainUrl, body);
    }
}
