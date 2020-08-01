import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private url = 'api/v1/apps';

    constructor(private httpRequest: HttpRequestService) { }

    getApps(): Observable<any> {
        return this.httpRequest.get(this.url, 'false');
    }


}
