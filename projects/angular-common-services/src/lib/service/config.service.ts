import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private marketUrl: string;

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  private loadMarketUrl(): Observable<string> {
    return this.httpRequest.get(`${this.apiPaths.config}/market-url`,
      {
        responseType: 'text',
        withCredentials: true
      })
      .pipe(tap(x => this.marketUrl = x));
  }

  getMarketUrl(): Observable<string> {
    if (!this.marketUrl) {
       return this.loadMarketUrl();
    }
    return new BehaviorSubject(this.marketUrl).asObservable();
  }
}
