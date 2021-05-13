import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {UserRoleResponse} from '../model/api/account-role-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {

  private readonly USER_ROLES = 'v2/userRoles';

  constructor(private httpService: HttpRequestService) {
  }

  getUserRoles(pageNumber: number, pageLimit: number): Observable<Page<UserRoleResponse | any>> {
    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(pageLimit));

    return this.httpService.get(this.USER_ROLES, { params });
  }
}
