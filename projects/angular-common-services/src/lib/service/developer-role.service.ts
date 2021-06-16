import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {DeveloperRoleResponse} from '../model/api/account-role-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root',
})
export class DeveloperRoleService {

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  getDeveloperRoles(pageNumber: number, pageLimit: number): Observable<Page<DeveloperRoleResponse | any>> {
    return this.httpService.get(this.apiPaths.developerRoles, {
      params: new OcHttpParams()
        .append('pageNumber', String(pageNumber))
        .append('limit', String(pageLimit)),
      });
  }
}
