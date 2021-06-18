import { get } from 'lodash';

export interface SiteContentModel {
    contentId: string;
    created: number;
    customData: ResponseSiteConfig;
    lastUpdated: number;
    siteId: string;
    type: string;
}

export interface ResponseSiteConfig {
    siteTitle: string;
    siteFavicon: string;
    headerLogo: string;
    headerMenu?: HeaderMenuModel[];
    heroTitle: string;
    heroSubtext: string;
    calloutTitle: string;
    calloutBody: string;
    calloutButtonText: string;
    calloutButtonLocation: string;
    calloutImage: string;
    footerMenu: FooterMenuModel;
    footerLogo: string;
    loginLogo: string;
}

export interface HeaderMenuModel {
    label: string;
    location: string;
}

export interface FooterMenuModel {
    label: string;
    location: string;
    items?: FooterMenuItem[];
}

export interface FooterMenuItem {
    label: string;
    location: string;
}

export class DefaultSiteConfig implements SiteContentModel {
    contentId: string;
    created: number;
    customData: ResponseSiteConfig;
    lastUpdated: number;
    siteId: string;
    type: string;

    constructor(siteContentResponse: SiteContentModel, siteContentMapperConfig: ResponseSiteConfig, defaultSiteConfig: DefaultSiteConfig) {
        for (const prop in siteContentMapperConfig) {
            if (siteContentMapperConfig.hasOwnProperty(prop)) {
                this[prop] = get(siteContentResponse, siteContentMapperConfig[prop], defaultSiteConfig[prop]);
            }
        }
    }
}
