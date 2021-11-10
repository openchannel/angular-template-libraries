import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectStripeAccountResponse, DisconnectStripeAccountResponse, GetStripeAccountsResponse } from '../model/api/stripe.model';
import { HttpRequestService } from './http-request-services';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service to work with Stripe.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * POST 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * DELETE 'v2/stripe-gateway/developer/this/accounts/{stripeId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class StripeService {
    constructor(public httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get all developer accounts connected to Stripe
     *
     * @returns {Observable<GetStripeAccountsResponse>} `Observable<GetStripeAccountsResponse>`
     *
     * ### Example
     *
     * `getConnectedAccounts();`
     */
    getConnectedAccounts(): Observable<GetStripeAccountsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/this/accounts`);
    }

    /**
     *
     * Description: Returns a link to Stripe, where developer can connect Stripe account
     *
     * @param {string} redirectUrl - The URL to redirect this developer after they have connected their Stripe account
     * @returns {Observable<ConnectStripeAccountResponse>} `Observable<ConnectStripeAccountResponse>`
     *
     * ### Example
     *
     * `connectAccount('https://my-market.com/land-here');`
     */
    connectAccount(redirectUrl: string): Observable<ConnectStripeAccountResponse> {
        const body = { redirectUrl };

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/this/accounts`, body);
    }

    /**
     *
     * Description: Disconnects developer from Stripe
     *
     * @param {string} stripeId - The id of the Stripe account to disconnect
     * @returns {Observable<DisconnectStripeAccountResponse>} `Observable<DisconnectStripeAccountResponse>`
     *
     * ### Example
     *
     * `disconnectAccount('stripe-id');`
     */
    disconnectAccount(stripeId: string): Observable<DisconnectStripeAccountResponse> {
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/this/accounts/${stripeId}`);
    }
}
