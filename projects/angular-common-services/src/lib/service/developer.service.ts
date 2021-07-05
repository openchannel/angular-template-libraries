import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { DeveloperModel, DeveloperUpdateModel } from '../model/api/developer.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting and modifying Developer model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developers/this'<br>
 *
 * PATCH 'v2/developers/this'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get Data about developer
     *
     * @returns {Observable<DeveloperModel>} `Observable<DeveloperModel>`
     *
     * ### Example
     *
     * `getDeveloper();`
     */
    getDeveloper(): Observable<DeveloperModel> {
        return this.httpRequest.get(`${this.apiPaths.developer}/this`);
    }

    /**
     *
     * Description: Update developer data
     *
     * @param {DeveloperUpdateModel} updateDeveloperRequest - (required) Developer model to update
     * @returns {Observable<DeveloperModel>} `Observable<DeveloperModel>`
     *
     * ### Example
     *
     * `updateDeveloper({
     *   email:'email@email.com',
     *   name:'Name',
     *   type:'asd',
     *   customData:{}
     * });`
     */
    updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel): Observable<DeveloperModel> {
        return this.httpRequest.patch(`${this.apiPaths.developer}/this`, updateDeveloperRequest);
    }
}
