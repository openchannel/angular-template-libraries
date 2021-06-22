import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { AppResponse, AppStatusValue, CreateAppModel, PublishAppVersionModel } from '../model/api/app-data-model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';

/**
 * Description: API service for getting and modifying apps.<br>
 * Documentation: <a href="https://support.openchannel.io/documentation/api/#531-apps">Openchannel API</a><br>
 * Endpoints:<br>
 * GET '/v2/apps'<br>
 * GET '/v2/apps/{appId}'<br>
 * GET '/v2/apps/bySafeName'<br>
 * GET '/v2/apps/textSearch'<br>
 * POST '/v2/apps/{appId}/publish'<br>
 * POST '/v2/apps/versions/${version}/status<br>
 * DELETE '/v2/apps/{appId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class AppsService {
    private readonly APPS_URL = 'v2/apps';

    constructor(private httpRequest: HttpRequestService) {
    }

    /**
     * Description: Searching apps returns App Pages based on query and text criteria.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#438-apps-search-apps">Openchannel API</a>
     *
     * @param searchText (required) Text for searching
     * @param query - (optional) Your specific search query.
     *  Documentation <a href="https://support.openchannel.io/documentation/api/#380-query-document">Openchannel API</a>
     * @param fields (required) Fields for searching.
     *  Default value = ['name'].
     *
     *  @return Observable<Page<AppResponse>>
     *
     * * ### Example:
     *``
     * searchApp("My First App", "{"status.value": {"$in":["pending", "inDevelopment"]}}")
     *``
     */
    searchApp(searchText: string, query: string, fields: string[] = ['name']): Observable<Page<AppResponse | any>> {
        const mainUrl = `${this.APPS_URL}/textSearch`;

        let params = new OcHttpParams().append('fields', JSON.stringify(fields)).appendRequiredParam('text', searchText, '');
        if (query) {
            params = params.append('query', query);
        }

        return this.httpRequest.get(mainUrl, {params});
    }

    /**
     * Description: Listing apps returns App Pages based on query and sort criteria.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#436-apps-list-apps">Openchannel API</a>
     *
     * @param pageNumber - (optional) Current page index. Starts from >= 1.
     * @param limit - (optional) Count apps into response. Starts from >= 1.
     * @param sort - (optional) Sort apps by specific field.
     *  Documentation <a href="https://support.openchannel.io/documentation/api/#381-sort-document">Openchannel API</a>
     * @param query - (optional) Your specific search query.
     *  Documentation <a href="https://support.openchannel.io/documentation/api/#380-query-document">Openchannel API</a>
     * @param isOwner (optional) Whether this result should only contain apps that are owned by this user.
     *   Default value = false.
     *
     * @return Observable<Page<AppResponse>
     *
     * ### Example:
     * ``
     * getApps(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}", true);
     * ``
     */
    getApps(pageNumber: number, limit: number, sort: any, query: any, isOwner: boolean = false): Observable<Page<AppResponse | any>> {
        const params = new OcHttpParams()
            .append('sort', sort)
            .append('query', query)
            .append('isOwner', String(isOwner))
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit));

        return this.httpRequest.get(this.APPS_URL, {params});
    }

    /**
     * Description: Retrieving an app returns a single, specific, live app by safe name.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#761-apps-get-app-by-safename">Openchannel API</a>
     *
     * @param appSafeName (required) The safeName of the app
     *
     * @return Observable<AppResponse>
     *
     * ### Example:
     * ``
     * getAppBySafeName("fuel-crm-and-marketing");
     * ``
     */
    getAppBySafeName(appSafeName: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.APPS_URL}/bySafeName/${appSafeName}`);
    }

    /**
     * Description: Create an app with version 1.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#407-apps-create-app">Openchannel API</a>
     *
     * @param createAppRequest (required) Request data for creating a new app.
     *  Note: fields 'name' and 'developerId' are required in this request.
     *
     *  @return Observable<AppResponse>
     *
     * ### Example:
     * ``
     * createApp({"name": "My App", "developerId":"a76dj3gks"});
     * ``
     */
    createApp(createAppRequest: CreateAppModel): Observable<AppResponse> {
        return this.httpRequest.post(this.APPS_URL, createAppRequest);
    }

    /**
     * Description: Delete the app by app ID.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#409-apps-delete-app">Openchannel API</a>
     *
     * @param appId (required) Application ID.
     *
     * @return empty response {};
     *
     * ### Example:
     * ``
     *  deleteApp("6238426d0c0osf654208");
     * ``
     */
    deleteApp(appId: string): Observable<any> {
        return this.httpRequest.delete(`${this.APPS_URL}/${appId}`);
    }

    /**
     * Description: When a developer creates or updates an app, a new app version is created but
     *  is not yet visible to users or administrators. Publishing apps makes the app visible to the administrator
     *  and signals the app’s readiness for entry to the public marketplace. This is useful when developers have created
     *  an app draft and are ready to submit their app for approval.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#412-apps-publish-app-version">Openchannel API</a>
     *
     * @param appId (required) Application ID.
     * @param publishAppVersionModel
     *
     * @return empty response {};
     *
     * ### Example:
     * ``
     * publishAppByVersion("6238426d0c0osf654208", {"version": 1, "autoApprove": true})
     * ``
     */
    publishAppByVersion(appId: string, publishAppVersionModel: PublishAppVersionModel): Observable<any> {
        const mainUrl = `${this.APPS_URL}/${appId}/publish`;
        return this.httpRequest.post(mainUrl, publishAppVersionModel);
    }

    /**
     * Description: Returns a single, specific, live app.
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#437-apps-get-an-app">Openchannel API</a>
     *
     * @param appId (required) Application ID.
     *
     * @return Observable<AppResponse>
     *
     * ### Example:
     * ``
     * getAppById("6238426d0c0osf654208");
     * ``
     */
    getAppById(appId: string): Observable<AppResponse> {
        return this.httpRequest.get(`${this.APPS_URL}/${appId}`);
    }

    /**
     * Description: Changes the status of an app. This action can be performed by either administrators or developers.
     * Only certain status changes are allowed. For instance, a developer is only able to suspend and unsuspend their app
     * (which must already be approved).
     *
     * Documentation: <a href="https://support.openchannel.io/documentation/api/#415-apps-status-change">Openchannel API</a>
     *
     * @param appId (required) Application ID.
     * @param version (required) Application version. Starts from >= 1.
     * @param status (required) 'pending' | 'inReview' | 'inDevelopment' | 'approved' | 'suspended' | 'rejected'.
     * @param reason (optional) The reason for this status change.
     *
     * @return empty response {};
     *
     * ### Example:
     * ``
     * changeAppStatus("6238426d0c0osf654208", 1, 'pending', 'Approved by admin.')
     * ``
     */
    changeAppStatus(appId: string, version: number, status: AppStatusValue, reason?: string): Observable<any> {
        const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}/status`;
        const body = {
            status,
            reason: reason ? reason : '',
        };

        return this.httpRequest.post(mainUrl, body);
    }
}
