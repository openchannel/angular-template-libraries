import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class StatisticService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    recordVisitToApp(appId: string): Observable<any> {
        const mainUrl = `${this.apiPaths.stats}/increment/views`;
        return this.httpRequest.post(mainUrl, { appId });
    }
}
