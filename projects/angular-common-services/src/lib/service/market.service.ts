import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { MarketModel } from '../model/api/market.model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting Market Data.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/markets/this'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class MarketService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

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
        const mainUrl = `${this.apiPaths.markets}/this`;
        return this.httpService.get(mainUrl);
    }
}
