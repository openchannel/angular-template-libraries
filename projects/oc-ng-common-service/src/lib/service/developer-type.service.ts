import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {DeveloperTypeModel} from '../model/api/developer.model';
import {Page} from '../model/api/page.model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root'
})
export class DeveloperTypeService {

  private readonly BASIC_URL = 'v2/developerTypes';

  constructor(private httpRequest: HttpRequestService) { }

  getDeveloperType(developerTypeId: string): Observable<DeveloperTypeModel> {
    const mainUrl = `${this.BASIC_URL}/${developerTypeId}`;
    return this.httpRequest.get(mainUrl);
  }

  getAllDeveloperTypes(pageNumber: number, limit: number, query?: string): Observable<Page<DeveloperTypeModel>> {
    return this.httpRequest.get(this.BASIC_URL, {
      params: new OcHttpParams()
        .append('query', query)
        .append('pageNumber', String(pageNumber))
        .append('limit', String(limit)),
    });
  }
}
