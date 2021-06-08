import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {UserRoleResponse} from '../model/api/account-role-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {

  private USER_ROLES;

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    this.USER_ROLES = apiPaths.userRoles;
  }

  getUserRoles(pageNumber: number, pageLimit: number): Observable<Page<UserRoleResponse | any>> {
    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(pageLimit));

    return this.httpService.get(this.USER_ROLES, { params });
  }
}
