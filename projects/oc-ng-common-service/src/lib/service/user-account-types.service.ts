import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {UserAccountTypeModel} from '../model/api/user-type.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountTypesService {

  private readonly BASE_USER_ACCOUNTS_TYPES = 'v2/userAccountTypes';

  constructor(private httpService: HttpRequestService) { }

  /**
   * Getting user profile fields definition by type
   * @param type type from the user account data
   */
  getUserAccountType(type: string): Observable<UserAccountTypeModel> {
    return this.httpService.get(`${this.BASE_USER_ACCOUNTS_TYPES}/${type}`);
  }

  getUserAccountTypes(pageNumber: number, limit: number, query?: string): Observable<Page<UserAccountTypeModel>> {
    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query);

    return this.httpService.get(this.BASE_USER_ACCOUNTS_TYPES, { params });
  }
}
