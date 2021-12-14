export interface StripeAccount {
    stripeId: string;
    accountName: string;
    country: string;
    defaultCurrency: string;
}

export interface ChangeableCreditCardFields {
    isDefault: boolean;
    address_city?: string;
    address_country?: string;
    address_line1?: string;
    address_line2?: string;
    address_state?: string;
    address_zip?: string;
}

export interface CreditCard extends ChangeableCreditCardFields {
    cardId: string;
    exp_year: number;
    exp_month: number;
    last4: string;
    brand: string;
    name: string;
}

export interface ConnectStripeAccountResponse {
    developerId: string;
    expires: number;
    /**
     * URL to redirect developer, where Stripe account can be connected
     */
    targetUrl: string;
}

export interface StripeAccountsResponse {
    developerId: string;
    accounts: StripeAccount[];
}

export interface GetMarketplaceStripeSettingsResponse {
    clientId: string;
    /**
     * The publishableKey of the Stripe connected Stripe account for this marketplace
     */
    publishableKey: string;
}

export interface UserCreditCardsResponse {
    userId: string;
    cards: CreditCard[];
}

export interface Taxes {
    displayName: string;
    amount: number;
}

export interface PaymentTaxesResponse {
    subtotal: number;
    total: number;
    taxes: Taxes[];
}

export interface PurchaseModel {
    appId: string;
    modelId: string;
}

export interface Purchase {
    models: PurchaseModel[];
}
