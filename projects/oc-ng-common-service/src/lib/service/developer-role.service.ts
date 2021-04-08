import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {DeveloperRole} from '../model/api/account-role-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperRoleService {

  private readonly DEVELOPER_ROLES = 'v2/developerRoles';

  constructor(private httpService: HttpRequestService) {
  }

  getDeveloperRoles(pageNumber: number, pageLimit: number): Observable<Page<DeveloperRole>> {
    return this.httpService.get(this.DEVELOPER_ROLES, {
      params: new OcHttpParams()
        .append('pageNumber', String(pageNumber))
        .append('limit', String(pageLimit)),
      });
  }
}
