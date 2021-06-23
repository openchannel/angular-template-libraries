import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { CreateOwnershipModel, OwnershipModelResponse } from '../model/api/ownership.model';
import { HttpHeaders } from '@angular/common/http';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for managing Ownership.<br>
 *
 * Endpoints:<br>
 *
 * POST 'v2/ownership/install'<br>
 *
 * POST 'v2/ownership/uninstall/{ownershipId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class OwnershipService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Start new Ownership with provided data
     *
     * @param {CreateOwnershipModel} ownership - (required) Ownership Data to creation
     * @param {HttpHeaders} headers (optional) (default: empty HttpHeaders object)
     * @returns {Observable<OwnershipModelResponse>} `Observable<OwnershipModelResponse>`
     *
     * ### Example
     *
     * `installOwnership(
     * {
     *   appId: '0a8hs09dhas09d8h9',
     *   modelId: '9a8hs9a86sgd97a6sgd'
     * },
     * {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"}
     * )`
     */
    installOwnership(ownership: CreateOwnershipModel, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.apiPaths.ownership}/install`, ownership, { headers });
    }

    /**
     *
     * Description: End Ownership with Id
     *
     * @param {CreateOwnershipModel} ownership - (required) Ownership Data to uninstall
     * @param {HttpHeaders} headers (optional) (default: empty HttpHeaders object)
     * @returns {Observable<OwnershipModelResponse>} `Observable<OwnershipModelResponse>`
     *
     * ### Example
     *
     * `uninstallOwnership('0a8hs09dhas09d8h9', {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"})`
     */
    uninstallOwnership(ownershipId: string, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.apiPaths.ownership}/uninstall/${ownershipId}`, {}, { headers });
    }
}
