import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {MarketModel} from '../model/api/market.model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly MARKET_URL;

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    this.MARKET_URL = apiPaths.markets;
  }

  getCurrentMarket(): Observable<MarketModel> {
    const mainUrl = `${this.MARKET_URL}/this`;
    return this.httpService.get(mainUrl);
  }
}
