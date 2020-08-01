import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    private url = 'api/v1/stats/app';

    constructor(private httpRequest: HttpRequestService) { }

    getStats(object): Observable<any> {
        return this.httpRequest.get(this.url, 'false', object);
    }


}
