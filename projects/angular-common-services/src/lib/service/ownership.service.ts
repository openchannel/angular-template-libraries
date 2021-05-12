import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {CreateOwnershipModel, OwnershipModelResponse} from '../model/api/ownership.model';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OwnershipService {

    private readonly OWNERSHIP_URL = 'v2/ownership';

    constructor(private httpRequest: HttpRequestService) {}

    installOwnership(ownership: CreateOwnershipModel, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.OWNERSHIP_URL}/install`,
            ownership,  {headers});
    }

    uninstallOwnership(ownershipId: string, headers: HttpHeaders = new HttpHeaders()): Observable<OwnershipModelResponse> {
        return this.httpRequest.post(`${this.OWNERSHIP_URL}/uninstall/${ownershipId}`,
            {}, {headers});
    }
}
