import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {CreateOwnershipModel, OwnershipModelResponse} from '../model/api/ownership.model';
import {HttpHeaders} from '@angular/common/http';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root'
})
export class OwnershipService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    installOwnership(ownership: CreateOwnershipModel, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.apiPaths.ownership}/install`,
            ownership,  {headers});
    }

    uninstallOwnership(ownershipId: string, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.apiPaths.ownership}/uninstall/${ownershipId}`,
            {}, {headers});
    }
}
