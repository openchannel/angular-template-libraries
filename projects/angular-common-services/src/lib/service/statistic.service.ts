import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    private readonly STATS_URL = 'v2/stats';

    constructor(private httpRequest: HttpRequestService) {}

    recordVisitToApp(appId: string): Observable<any> {
        const mainUrl = `${this.STATS_URL}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId });
    }
}
