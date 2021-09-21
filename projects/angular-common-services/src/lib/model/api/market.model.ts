export interface MarketModel {
    marketplaceId: string;
    customerId: string;
    name: string;
    type: string;
    previewAppUrl: string;
    viewAppUrl: string;
}

export interface SiteAuthConfig {
    clientId: string;
    clientSecret: string;
    issuer: string;
    grantType: string;
    scope: string;
    validationMode: string;
    clientAccessType: string;
}
