import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {DeveloperRoleResponse} from '../model/api/account-role-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperRoleService {

  private readonly DEVELOPER_ROLES;

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    this.DEVELOPER_ROLES = apiPaths.developerRoles;
  }

  getDeveloperRoles(pageNumber: number, pageLimit: number): Observable<Page<DeveloperRoleResponse | any>> {
    return this.httpService.get(this.DEVELOPER_ROLES, {
      params: new OcHttpParams()
        .append('pageNumber', String(pageNumber))
        .append('limit', String(pageLimit)),
      });
  }
}
