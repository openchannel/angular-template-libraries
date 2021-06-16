import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {MarketModel} from '../model/api/market.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  getCurrentMarket(): Observable<MarketModel> {
    const mainUrl = `${this.apiPaths.markets}/this`;
    return this.httpService.get(mainUrl);
  }
}
