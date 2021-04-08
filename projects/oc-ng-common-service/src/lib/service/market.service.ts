import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {MarketModel} from '../model/api/market.model';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly MARKET_URL = 'v2/markets';

  constructor(private httpService: HttpRequestService) {
  }

  getCurrentMarket(): Observable<MarketModel> {
    const mainUrl = `${this.MARKET_URL}/this`;
    return this.httpService.get(mainUrl);
  }
}
