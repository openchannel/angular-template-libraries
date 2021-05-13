import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly CONFIG_URL = 'v2/config';

  private marketUrl: string;

  constructor(private httpRequest: HttpRequestService) { }

  private loadMarketUrl(): Observable<string> {
    return this.httpRequest.get(`${this.CONFIG_URL}/market-url`,
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
