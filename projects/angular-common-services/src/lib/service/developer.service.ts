import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {DeveloperModel, DeveloperUpdateModel} from '../model/api/developer.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  getDeveloper(): Observable<DeveloperModel> {
    return this.httpRequest.get(`${this.apiPaths.developer}/this`);
  }

  updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel): Observable<DeveloperModel> {
    return this.httpRequest.patch(`${this.apiPaths.developer}/this`, updateDeveloperRequest);
  }
}
