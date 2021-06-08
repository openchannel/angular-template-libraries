import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {CreateOwnershipModel, OwnershipModelResponse} from '../model/api/ownership.model';
import {HttpHeaders} from '@angular/common/http';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root'
})
export class OwnershipService {

    private OWNERSHIP_URL;

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
        this.OWNERSHIP_URL = apiPaths.ownership;
    }

    installOwnership(ownership: CreateOwnershipModel, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.OWNERSHIP_URL}/install`,
            ownership,  {headers});
    }

    uninstallOwnership(ownershipId: string, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.OWNERSHIP_URL}/uninstall/${ownershipId}`,
            {}, {headers});
    }
}
