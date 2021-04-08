import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {DeveloperModel, DeveloperUpdateModel} from '../model/api/developer.model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private readonly BASIC_URL = 'v2/developers';

  constructor(private httpRequest: HttpRequestService) {
  }

  getDeveloper(): Observable<DeveloperModel> {
    return this.httpRequest.get(`${this.BASIC_URL}/this`);
  }

  updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel): Observable<DeveloperModel> {
    return this.httpRequest.patch(`${this.BASIC_URL}/this`, updateDeveloperRequest);
  }
}
