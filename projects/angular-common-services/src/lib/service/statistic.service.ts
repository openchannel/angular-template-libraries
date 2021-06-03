import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';

/**

 * Description: API service for work with statistic.<br>

 * Endpoints:<br>

 * POST 'v2/stats/increment/views'<br>

 */
@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    private readonly STATS_URL = 'v2/stats';

    constructor(private httpRequest: HttpRequestService) {}
    /**
     * Description: Increment visits to app
     * 
     * @param {string} appId - (required)
     * @returns {Observable<any>} `Observable<any>`
     * 
     * * ### Example:
     *
     * `recordVisitToApp('a2sd876ags7dd6g')`
     *
     */
    recordVisitToApp(appId: string): Observable<any> {
        const mainUrl = `${this.STATS_URL}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId });
    }
}
