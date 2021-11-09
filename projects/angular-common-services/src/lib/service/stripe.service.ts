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
 * POST 'v2/stripe-gateway/developer/{developerId}/accounts'<br>
 *
 * DELETE 'v2/stripe-gateway/developer/{developerId}/accounts/{stripeId}'<br>
 *
 * GET 'v2/stripe-gateway/developer/{developerId}/accounts'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class StripeService {
    constructor(public httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Returns a link to Stripe, where developer can connect Stripe account
     *
     * @param {string} redirectURL - The URL to redirect this developer after they have connected their Stripe account
     * @param {string} developerId - The id of the developer connecting their Stripe account
     * @returns {Observable<ConnectStripeAccountResponse>} `Observable<ConnectStripeAccountResponse>`
     *
     * ### Example
     *
     * `connectAccount('https://my-market.com/land-here', 'developer-id');`
     */
    connectAccount(redirectURL: string, developerId: string): Observable<ConnectStripeAccountResponse> {
        const body = { redirectURL };

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/${developerId}/${this.apiPaths.accounts}`, body);
    }

    /**
     *
     * Description: Disconnects developer from Stripe
     *
     * @param {string} developerId - The id of the developer disconnecting their Stripe account
     * @param {string} stripeId - The id of the Stripe account to disconnect
     * @returns {Observable<DisconnectStripeAccountResponse>} `Observable<DisconnectStripeAccountResponse>`
     *
     * ### Example
     *
     * `disconnectAccount('developer-id', 'stripe-id');`
     */
    disconnectAccount(developerId: string, stripeId: string): Observable<DisconnectStripeAccountResponse> {
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/${developerId}/${this.apiPaths.accounts}/${stripeId}`);
    }

    /**
     *
     * Description: Get all developer accounts connected to Stripe
     *
     * @param {string} developerId - The id of the developer retrieving their account details
     * @returns {Observable<GetStripeAccountsResponse>} `Observable<GetStripeAccountsResponse>`
     *
     * ### Example
     *
     * `getConnectedAccounts('developer-id');`
     */
    getConnectedAccounts(developerId: string): Observable<GetStripeAccountsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/${developerId}/${this.apiPaths.accounts}`);
    }
}
