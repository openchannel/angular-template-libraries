import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcApiPaths } from '../oc-ng-common-service.module';
import { HttpHeaders } from '@angular/common/http';

/**
 * Description: API service for work with statistic.<br>
 *
 * Endpoints:<br>
 *
 * POST 'v2/stats/increment/views'<br>
 *
 */
@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}
    /**
     * Description: Increment visits to app
     *
     * @param {string} appId - (required)
     * @param {HttpHeaders} headers - (optional)
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `recordVisitToApp('a2sd876ags7dd6g')`
     *
     */
    recordVisitToApp(appId: string, headers?: HttpHeaders): Observable<any> {
        const mainUrl = `${this.apiPaths.stats}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId }, headers ? { headers } : {});
    }

    /**
     * Description: Increment app statistic field
     *
     * @param {string} field - (required)
     * @param {string} appId - (required)
     * @param {HttpHeaders} headers - (optional)
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `record('installs','a2sd876ags7dd6g')`
     *
     */
    record(field: string, appId: string, headers?: HttpHeaders): Observable<any> {
        const mainUrl = `${this.apiPaths.stats}/increment/${field}`;
        return this.httpRequest.post(mainUrl, { appId }, headers ? { headers } : {});
    }
}
