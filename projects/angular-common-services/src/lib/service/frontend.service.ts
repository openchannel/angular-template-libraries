import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {FilterResponse, SortResponse} from '../model/components/frontend.model';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    private readonly FRONTEND_URL = 'v2/frontEnd';

    constructor(private httpRequest: HttpRequestService) {
    }

    getSorts(): Observable<Page<SortResponse>> {
        return this.httpRequest.get(`${this.FRONTEND_URL}/sorts`);
    }

    getFilters(): Observable<Page<FilterResponse>> {
        return this.httpRequest.get(`${this.FRONTEND_URL}/filters`);
    }
}
