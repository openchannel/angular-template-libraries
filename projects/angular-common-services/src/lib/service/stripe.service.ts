import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ConnectStripeAccountResponse,
    DisconnectStripeAccountResponse,
    GetStripeAccountsResponse,
    GetMarketplaceStripeSettingsResponse,
    GetUserCreditCardsResponse,
    ChangeableCreditCardFields,
} from '../model/api/stripe.model';
import { HttpRequestService } from './http-request-services';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service to work with Stripe.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/stripe-gateway/settings'<br>
 *
 * GET 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
 *
 * DELETE 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
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
     * Description: Returns the Stripe settings configured for this marketplace
     *
     * @returns {Observable<GetMarketplaceStripeSettingsResponse>} `Observable<GetMarketplaceStripeSettingsResponse>`
     *
     * ### Example
     *
     * `getMarketplaceStripeSettings();`
     */
    getMarketplaceStripeSettings(): Observable<GetMarketplaceStripeSettingsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/settings`);
    }

    /**
     *
     * Description: Returns a list of credit cards configured for this user
     *
     * @returns {Observable<GetUserCreditCardsResponse>} `Observable<GetUserCreditCardsResponse>`
     *
     * ### Example
     *
     * `getUserCreditCards();`
     */
    getUserCreditCards(): Observable<GetUserCreditCardsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/user/this/cards`);
    }

    /**
     *
     * Description: Adds user credit card, which can be used later
     *
     * @param {string} token - The Stripe token returned by the Stripe.js Stripe.card.createToken call
     * @param {string} isDefault - Set to true if this should be set to be the default credit card
     * @returns {Observable<GetUserCreditCardsResponse>} `Observable<GetUserCreditCardsResponse>`
     *
     * ### Example
     *
     * `addUserCreditCard();`
     */
    addUserCreditCard(token: string, isDefault: boolean = true): Observable<GetUserCreditCardsResponse> {
        const body = {
            token,
            isDefault,
        };

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/user/this/cards`, body);
    }

    /**
     *
     * Description: Updates fields in user credit card
     *
     * @param {string} cardId - Id of the card to update
     * @param {Partial<ChangeableCreditCardFields>} body - Fields to update in credit card
     * @returns {Observable<GetUserCreditCardsResponse>} `Observable<GetUserCreditCardsResponse>`
     *
     * ### Example
     *
     * `updateUserCreditCard();`
     */
    updateUserCreditCard(cardId: string, body: Partial<ChangeableCreditCardFields>): Observable<GetUserCreditCardsResponse> {
        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/user/this/cards/${cardId}`, body);
    }

    /**
     *
     * Description: Deletes card from user account
     *
     * @param {string} cardId - Id of the card to delete
     * @returns {Observable<GetUserCreditCardsResponse>} `Observable<GetUserCreditCardsResponse>`
     *
     * ### Example
     *
     * `deleteUserCreditCard();`
     */
    deleteUserCreditCard(cardId: string): Observable<GetUserCreditCardsResponse> {
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/user/this/cards/${cardId}`);
    }

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
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/developer/this/accounts`);
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

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/developer/this/accounts`, body);
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
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/developer/this/accounts/${stripeId}`);
    }
}
