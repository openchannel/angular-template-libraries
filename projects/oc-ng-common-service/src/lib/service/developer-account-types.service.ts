import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {Page} from '../model/api/page.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperAccountTypesService {

  private readonly DEVELOPER_ACCOUNTS_TYPES_URL = 'v2/developerAccountTypes';

  constructor(private httpService: HttpRequestService) { }

  getAccountType(type: string): Observable<any> {
    return this.httpService.get(`${this.DEVELOPER_ACCOUNTS_TYPES_URL}/${type}`);
  }

  getAllDeveloperAccountsType(pageNumber: number, limit: number, query?: string): Observable<Page<any>> {
    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query);

    return this.httpService.get(this.DEVELOPER_ACCOUNTS_TYPES_URL, { params });
  }
}
