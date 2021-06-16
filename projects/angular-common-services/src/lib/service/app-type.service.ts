import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {AppTypeModelResponse} from '../model/api/app-type-model';
import {QueryUtil} from '../util/query.util';
import {Page} from '../model/api/page.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class AppTypeService {

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  public getOneAppType(appTypeId: string): Observable<AppTypeModelResponse> {
    const mainUrl = `${this.apiPaths.appTypes}/${appTypeId}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }

  public getAppTypes(pageNumber: number, pageLimit: number): Observable<Page<AppTypeModelResponse>> {
    const mainUrl = `${this.apiPaths.appTypes}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }
}
