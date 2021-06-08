import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {AppTypeModelResponse} from '../model/api/app-type-model';
import {QueryUtil} from '../util/query.util';
import {Page} from '../model/api/page.model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root'
})
export class AppTypeService {

  private APP_TYPE_URL;

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    this.APP_TYPE_URL = apiPaths.appTypes;
  }

  public getOneAppType(appTypeId: string): Observable<AppTypeModelResponse> {
    const mainUrl = `${this.APP_TYPE_URL}/${appTypeId}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }

  public getAppTypes(pageNumber: number, pageLimit: number): Observable<Page<AppTypeModelResponse>> {
    const mainUrl = `${this.APP_TYPE_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }
}
