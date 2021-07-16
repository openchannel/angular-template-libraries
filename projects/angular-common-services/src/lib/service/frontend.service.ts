import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { FilterResponse, SortResponse } from '../model/components/frontend.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 *
 * Description: API service for getting available features for frontend.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/frontEnd/sorts'<br>
 *
 * GET 'v2/frontEnd/filters'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class FrontendService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get available sorts for frontend
     *
     * @returns {Observable<Page<SortResponse>>} `Observable<Page<SortResponse>>`
     *
     * ### Example:
     *
     * `getSorts();`
     */
    getSorts(): Observable<Page<SortResponse>> {
        return this.httpRequest.get(`${this.apiPaths.frontEnd}/sorts`);
    }

    /**
     *
     * Description: Get available filters for frontend
     *
     * @returns {Observable<Page<FilterResponse>>} `Observable<Page<FilterResponse>>`
     *
     * ### Example:
     *
     * `getFilters();`
     */
    getFilters(): Observable<Page<FilterResponse>> {
        return this.httpRequest.get(`${this.apiPaths.frontEnd}/filters`);
    }
}
