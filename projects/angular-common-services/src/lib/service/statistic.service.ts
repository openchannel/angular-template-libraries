import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcApiPaths } from '../oc-ng-common-service.module';

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
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `recordVisitToApp('a2sd876ags7dd6g')`
     *
     */
    recordVisitToApp(appId: string): Observable<any> {
        const mainUrl = `${this.apiPaths.stats}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId });
    }
}
