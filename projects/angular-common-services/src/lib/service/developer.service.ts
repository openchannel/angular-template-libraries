import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {DeveloperModel, DeveloperUpdateModel} from '../model/api/developer.model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private BASIC_URL;

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    this.BASIC_URL = apiPaths.developer;
  }

  getDeveloper(): Observable<DeveloperModel> {
    return this.httpRequest.get(`${this.BASIC_URL}/this`);
  }

  updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel): Observable<DeveloperModel> {
    return this.httpRequest.patch(`${this.BASIC_URL}/this`, updateDeveloperRequest);
  }
}
