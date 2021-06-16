import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {FilterResponse, SortResponse} from '../model/components/frontend.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getSorts(): Observable<Page<SortResponse>> {
        return this.httpRequest.get(`${this.apiPaths.frontEnd}/sorts`);
    }

    getFilters(): Observable<Page<FilterResponse>> {
        return this.httpRequest.get(`${this.apiPaths.frontEnd}/filters`);
    }
}
