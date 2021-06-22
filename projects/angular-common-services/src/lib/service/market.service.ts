import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {MarketModel} from '../model/api/market.model';

/**

 * Description: API service for getting Market Data.<br>

 * Endpoints:<br>

 * GET 'v2/markets/this'<br>
 */
@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly MARKET_URL = 'v2/markets';

  constructor(private httpService: HttpRequestService) {}

  /**
   * Description: Get Current Market Data
   *
   * @returns {Observable<MarketModel>} `Observable<MarketModel>`
   *
   * * ### Example
   *
   * getCurrentMarket()
   */
  getCurrentMarket(): Observable<MarketModel> {
    const mainUrl = `${this.MARKET_URL}/this`;
    return this.httpService.get(mainUrl);
  }
}
