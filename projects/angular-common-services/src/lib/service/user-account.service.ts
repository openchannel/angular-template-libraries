import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {UserAccount} from '../model/api/user.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  private BASE_USER_ACCOUNTS;

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    this.BASE_USER_ACCOUNTS = apiPaths.userAccounts;
  }

  /** Getting data about none-developer users */
  getUserAccount(): Observable<UserAccount> {
    return this.httpService.get(`${this.BASE_USER_ACCOUNTS}/this`);
  }

  getUserAccounts(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<UserAccount>> {
    const mainUrl = `${this.BASE_USER_ACCOUNTS}/all`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query)
      .append('sort', sort);

    return this.httpService.get(mainUrl, { params });
  }

  updateUserAccountFieldsForAnotherUser(
      userAccountId: string, skipTypeValidation: boolean, body: any): Observable<UserAccount> {

    const mainUrl = `${this.BASE_USER_ACCOUNTS}/${userAccountId}`;

    return this.httpService.patch(mainUrl, body, {
      params: new OcHttpParams().append('skipTypeValidators', String(skipTypeValidation))
    });
  }

  /**
   * Updating user account fields
   * @param accountData data from user profile form
   */
  updateUserAccount(accountData: any): Observable<any> {
    return this.httpService.patch(`${this.BASE_USER_ACCOUNTS}/this`, accountData);
  }

  deleteUserAccount(userAccountId: string): Observable<any> {
    return this.httpService.delete(`${this.BASE_USER_ACCOUNTS}/${userAccountId}`);
  }

  deleteCurrentUserAccount(): Observable<any> {
    return this.httpService.delete(`${this.BASE_USER_ACCOUNTS}/this`);
  }
}
