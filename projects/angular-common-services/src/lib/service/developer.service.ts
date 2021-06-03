import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {DeveloperModel, DeveloperUpdateModel} from '../model/api/developer.model';

/**

 * Description: API service for getting and modifying Developer model.<br>

 * Endpoints:<br>

 * GET 'v2/developers/this'<br>

 * PATCH 'v2/developers/this'<br>

 */
@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private readonly BASIC_URL = 'v2/developers';

  constructor(private httpRequest: HttpRequestService) {}

  /**
   *
   * Description: Get Data about developer
   *
   * @returns {Observable<DeveloperModel>} `Observable<DeveloperModel>`
   * 
   * * ### Example:
   * 
   * `getDeveloper();`
   */
  getDeveloper(): Observable<DeveloperModel> {
    return this.httpRequest.get(`${this.BASIC_URL}/this`);
  }

  /**
   *
   * Description: Update developer data
   *
   * @param {DeveloperUpdateModel} updateDeveloperRequest - (required) Developer model to update
   * @returns {Observable<DeveloperModel>} `Observable<DeveloperModel>`
   *
   * * ### Example:
   *
   * `updateDeveloper({
   *   email:'email@email.com',
   *   name:'Name',
   *   type:'asd',
   *   customData:{}
   * });`
   */
  updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel): Observable<DeveloperModel> {
    return this.httpRequest.patch(`${this.BASIC_URL}/this`, updateDeveloperRequest);
  }
}
