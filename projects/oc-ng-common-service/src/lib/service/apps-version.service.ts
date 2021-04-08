import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {AppVersion, UpdateAppVersionModel} from '../model/api/app-data-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';


@Injectable({
  providedIn: 'root'
})
export class AppVersionService {

  private readonly APPS_URL = 'v2/apps';

  constructor(private httpRequest: HttpRequestService) {
  }

  getAppsVersionsBySearchText(pageNumber: number, limit: number,
                              sort: string, query: string,
                              searchText: string, searchTextByFields: string[]): Observable<Page<AppVersion>> {

    const mainUrl = `${this.APPS_URL}/versions/textSearch`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('sort', sort)
      .append('query', query)
      .append('fields', JSON.stringify(searchTextByFields))
      .appendRequiredParam('searchText', searchText, '');

    return this.httpRequest.get(mainUrl, { params });
  }

  getAppsVersions(pageNumber: number, limit: number, sort: any, query: string): Observable<Page<AppVersion>> {

    const mainUrl = `${this.APPS_URL}/versions`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('sort', sort)
      .append('query', query);

    return this.httpRequest.get(mainUrl, { params });
  }

  /**
   * returns an empty response on success and response with
   *  'code' and 'message' on error
   */
  deleteAppVersion(appId: string, version: number): Observable<any> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.delete(mainUrl);
  }

  getAppByVersion(appId: string, version: number): Observable<AppVersion> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.get(mainUrl);
  }

  updateAppByVersion(appId: string, version: number, updateAppVersionModel: UpdateAppVersionModel): Observable<AppVersion> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.post(mainUrl, updateAppVersionModel);
  }
}
