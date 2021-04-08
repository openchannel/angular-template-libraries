import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {AppTypeModel} from '../model/api/app-type-model';
import {QueryUtil} from '../util/query.util';
import {Page} from '../model/api/page.model';

@Injectable({
  providedIn: 'root'
})
export class AppTypeService {

  private readonly APP_TYPE_URL = 'v2/appTypes';

  constructor(private httpRequest: HttpRequestService) {
  }

  public getOneAppType(appTypeId: string): Observable<AppTypeModel> {
    const mainUrl = `${this.APP_TYPE_URL}/${appTypeId}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }

  public getAppTypes(pageNumber: number, pageLimit: number): Observable<Page<AppTypeModel>> {
    const mainUrl = `${this.APP_TYPE_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }
}
