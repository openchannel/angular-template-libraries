import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    private STATS_URL;

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
        this.STATS_URL = apiPaths.stats;
    }

    recordVisitToApp(appId: string): Observable<any> {
        const mainUrl = `${this.STATS_URL}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId });
    }
}
