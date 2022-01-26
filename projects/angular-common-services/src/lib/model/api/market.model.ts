export interface MarketModel {
    marketplaceId: string;
    customerId: string;
    name: string;
    type: string;
    previewAppUrl: string;
    viewAppUrl: string;
}

export type AuthType = 'EXTERNAL' | 'AUTH_20' | 'SAML_20';

export interface SiteAuthConfig {
    type: AuthType;
    clientId: string;
    clientSecret: string;
    issuer: string;
    grantType: string;
    scope: string;
    validationMode: string;
    clientAccessType: string;

    /**
     * SAML 2.0 link for sign-in.
     */
    singleSignOnUrl: string;

    /**
     * SAML 2.0 link for sign-out.
     */
    singleLogOutUrl: string;
}
