import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { AppTypeModelResponse } from '../model/api/app-type-model';
import { QueryUtil } from '../util/query.util';
import { Page } from '../model/api/page.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting App Type model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/appTypes/{appTypeId}'<br>
 *
 * GET 'v2/appTypes'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class AppTypeService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}
    /**
     *
     * Description: Get app type by id
     *
     * @param {string} appTypeId - (required)
     * @returns {Observable<AppTypeModelResponse>} Observable<AppTypeModelResponse>
     *
     * ### Example
     *``
     * getOneAppType('3v874hy98374vr93');
     *``
     */
    getOneAppType(appTypeId: string): Observable<AppTypeModelResponse> {
        const mainUrl = `${this.apiPaths.appTypes}/${appTypeId}`;
        return this.httpRequest.get(encodeURI(mainUrl));
    }
    /**
     *
     * Description: Get App Types list with pagination
     *
     * @param {number} pageNumber - Current page index. Starts from >= 1
     * @param {number} pageLimit - Count users into response. Starts from >= 1.
     * @returns {Observable<Page<AppTypeModelResponse>>} Observable<Page<AppTypeModelResponse>>
     *
     * ### Example
     *``
     * getAppTypes(1,10);
     *``
     */
    getAppTypes(pageNumber: number, pageLimit: number): Observable<Page<AppTypeModelResponse>> {
        const mainUrl = `${this.apiPaths.appTypes}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
        return this.httpRequest.get(encodeURI(mainUrl));
    }
}
