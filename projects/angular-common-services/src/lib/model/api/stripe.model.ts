export interface StripeAccount {
    stripeId: string;
    accountName: string;
    country: string;
    defaultCurrency: string;
}

export interface ConnectStripeAccountResponse {
    developerId: string;
    expires: number;
    /**
     * URL to redirect developer, where Stripe account can be connected
     */
    targetUrl: string;
}

export interface DisconnectStripeAccountResponse {
    developerId: string;
    accounts: StripeAccount[];
}

export interface GetStripeAccountsResponse {
    developerId: string;
    accounts: StripeAccount[];
}
