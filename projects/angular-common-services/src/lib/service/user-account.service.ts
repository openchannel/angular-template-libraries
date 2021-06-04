import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {HttpRequestService} from './http-request-services';
import {UserAccount} from '../model/api/user.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';


/**

 * Description: API service for getting and modifying User Account model.<br>

 * Documentation: <a href="https://support.openchannel.io/documentation/api/#481-user">Openchannel API</a><br>

 * Endpoints:<br>

 * GET 'v2/userAccounts/all'<br>

 * GET 'v2/userAccounts/this'<br>

 * PATCH 'v2/userAccounts/this'<br>

 * DELETE 'v2/userAccounts/this'<br>

 * GET 'v2/userAccounts/{userAccountId}'<br>

 * DELETE 'v2/userAccounts/{userAccountId}'<br>

 */
@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  private readonly BASE_USER_ACCOUNTS = 'v2/userAccounts';

  constructor(private httpService: HttpRequestService) {
  }

  /**
   * Description: Getting data about none-developer users
   * 
   * @returns {Observable<UserAccount>} Observable<UserAccount>
   * 
   * * ### Example:
   *``
   * getUserAccount()
   *``
   */
  getUserAccount(): Observable<UserAccount> {
    return this.httpService.get(`${this.BASE_USER_ACCOUNTS}/this`);
  }
  /**
   * 
   * Description: Get list of User Accounts with pagination
   * 
   * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
   * @param {number} limit - (optional) Count apps into response. Starts from >= 1.
   * @param {string} sort - (optional) Sort apps by specific field.
   * @param {string} query - (optional) Your specific search query.
   * @returns {Observable<Page<UserAccount>>} Observable<Page<UserAccount>>
   * 
   * * ### Example:
   *``
   * getUserAccounts(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
   *``
   */
  getUserAccounts(pageNumber?: number, limit?: number, sort?: string, query?: string): Observable<Page<UserAccount>> {
    const mainUrl = `${this.BASE_USER_ACCOUNTS}/all`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query)
      .append('sort', sort);

    return this.httpService.get(mainUrl, { params });
  }
  /**
   * Description: Update User Account fields for some particular user
   * 
   * @param {string} userAccountId - (required)
   * @param {boolean} skipTypeValidation - (optional)
   * @param {any} body 
   * @returns {Observable<UserAccount>} Observable<UserAccount>
   * 
   * * ### Example:
   *``
   * updateUserAccountFieldsForAnotherUser('8ahs9d87has8d7h', true, {name: 'Test'});
   *``
   */
  updateUserAccountFieldsForAnotherUser(
      userAccountId: string, skipTypeValidation: boolean, body: any): Observable<UserAccount> {

    const mainUrl = `${this.BASE_USER_ACCOUNTS}/${userAccountId}`;

    return this.httpService.patch(mainUrl, body, {
      params: new OcHttpParams().append('skipTypeValidators', String(skipTypeValidation))
    });
  }

  /**
   * Description: Updating user account fields
   * 
   * @param {any} accountData - data from user profile form
   * @returns {Observable<any>} Observable<any>
   * 
   * * ### Example:
   *``
   * updateUserAccount({name: 'Test'});
   *``
   */
  updateUserAccount(accountData: any): Observable<any> {
    return this.httpService.patch(`${this.BASE_USER_ACCOUNTS}/this`, accountData);
  }
  /**
   * Description: Deleting User Account by Id
   * 
   * @param {string} userAccountId - (required) Account Id to delete
   * @returns {Observable<any>} Observable<any>
   * 
   * * ### Example:
   *``
   * deleteUserAccount('a8s6gd978asgd8');
   *``
   */
  deleteUserAccount(userAccountId: string): Observable<any> {
    return this.httpService.delete(`${this.BASE_USER_ACCOUNTS}/${userAccountId}`);
  }
  /**
   * Description: Deleting User Accaunt of none-developer
   * 
   * @returns {Observable<any>} Observable<any>
   * 
   * * ### Example:
   *``
   * deleteCurrentUserAccount();
   *``
   */
  deleteCurrentUserAccount(): Observable<any> {
    return this.httpService.delete(`${this.BASE_USER_ACCOUNTS}/this`);
  }
}
