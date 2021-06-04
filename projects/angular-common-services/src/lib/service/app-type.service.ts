import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {AppTypeModelResponse} from '../model/api/app-type-model';
import {QueryUtil} from '../util/query.util';
import {Page} from '../model/api/page.model';

/**
 * Description: API service for getting App Type model.<br>
 * 
 * Endpoints:<br>
 * 
 * GET 'v2/appTypes/{appTypeId}'<br>
 * 
 * GET 'v2/appTypes'<br>
 */
@Injectable({
  providedIn: 'root'
})
export class AppTypeService {

  private readonly APP_TYPE_URL = 'v2/appTypes';

  constructor(private httpRequest: HttpRequestService) {
  }
     /**
     * 
     * Description: Get app type by id
     * 
     * @param {string} appTypeId - (required)
     * @returns {Observable<AppTypeModelResponse>} Observable<AppTypeModelResponse>
     * 
     * * ### Example:
     *``
     * getOneAppType('3v874hy98374vr93');
     *``
     */
  public getOneAppType(appTypeId: string): Observable<AppTypeModelResponse> {
    const mainUrl = `${this.APP_TYPE_URL}/${appTypeId}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }
   /**
     * 
     * Description: Get App Types list with pagination
     * 
     * @param {number} pageNumber - Current page index. Starts from >= 1
     * @param {number} pageLimit - Count users into response. Starts from >= 1.
     * @returns {Observable<Page<AppTypeModelResponse>>} Observable<Page<AppTypeModelResponse>>
     * 
     * * ### Example:
     *``
     * getAppTypes(1,10);
     *``
     */
  public getAppTypes(pageNumber: number, pageLimit: number): Observable<Page<AppTypeModelResponse>> {
    const mainUrl = `${this.APP_TYPE_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }
}
