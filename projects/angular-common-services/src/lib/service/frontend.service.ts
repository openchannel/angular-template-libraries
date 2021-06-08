import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {FilterResponse, SortResponse} from '../model/components/frontend.model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    private FRONTEND_URL;

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
        this.FRONTEND_URL = apiPaths.frontEnd;
    }

    getSorts(): Observable<Page<SortResponse>> {
        return this.httpRequest.get(`${this.FRONTEND_URL}/sorts`);
    }

    getFilters(): Observable<Page<FilterResponse>> {
        return this.httpRequest.get(`${this.FRONTEND_URL}/filters`);
    }
}
