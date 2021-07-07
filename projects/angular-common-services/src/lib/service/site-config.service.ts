import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SiteConfig } from '../model/components/frontend.model';
import { TitleService } from './title.service';

/**
 * Description: Service for setting up site config.<br>
 *
 * @param {string} siteConfig
 *
 * Methods:
 *
 * setMeta
 *
 * setFavicon
 *
 * initSiteConfiguration
 */
@Injectable({
    providedIn: 'root',
})
export class SiteConfigService {
    siteConfig: SiteConfig;
    private siteConfigSetupTrigger: Subject<void> = new Subject<void>();

    constructor(private titleService: TitleService, private metaService: Meta) {}

    /**
     * Description: Set up meta tags from the Site Config
     *
     * @returns {void}
     *
     * ### Example
     * ``setMeta()``
     */
    setMeta(): void {
        this.metaService.addTags(this.siteConfig.metaTags);
    }

    /**
     * Description: Set up the favicon for the app
     *
     * @param {string} customPath - (optional) path to the favicon icon
     * @param {string} customIconType - (optional) type of the favicon icon. Default: 'image/x-icon'
     * @returns {void}
     *
     * ### Example
     * ``
     * setFavicon('/path/img', 'png')
     * ``
     */
    setFavicon(customPath?: string, customIconType?: string): void {
        const iconLink: HTMLLinkElement = document.querySelector('#custom-favicon');
        const type = customIconType ? customIconType : this.siteConfig.favicon.type ? this.siteConfig.favicon.type : 'image/x-icon';
        const value = customPath ? customPath : this.siteConfig.favicon.href;

        if (iconLink) {
            iconLink.href = value;
            iconLink.type = type;
        } else {
            const linkElement = document.createElement('link');
            linkElement.setAttribute('id', 'custom-favicon');
            linkElement.setAttribute('rel', 'icon');
            linkElement.setAttribute('type', type);
            linkElement.setAttribute('href', value);
            document.head.appendChild(linkElement);
        }
    }

    /**
     * Description: Set up a site by the Site Config
     *
     * @param {SiteConfig} config - Set initial site configuration
     * @returns {void}
     *
     * ### Example
     * ``
     * initSiteConfiguration({
     * title: 'title';
     * tagline: 'some';
     * metaTags: Array<{
     *  charset: 'some string',
     *  content: 'some string',
     *  httpEquiv: 'some string',
     *  id: 'some string',
     *  itemprop: 'some string',
     *  name: 'some string',
     *  property: 'some string',
     *  scheme: 'some string',
     *  url: 'some string'
     * }>;
     * favicon: {
     *     href: '/img' ;
     *     type?: 'png';
     * };
     * })
     * ``
     */
    initSiteConfiguration(config: SiteConfig): void {
        this.siteConfig = config;
        this.titleService.title = this.siteConfig.title;
        this.setMeta();
        this.setFavicon();
        this.siteConfigSetupTrigger.next();
    }

    getSiteConfigAsObservable(): Observable<SiteConfig> {
        return this.siteConfig ? of(this.siteConfig) : this.siteConfigSetupTrigger.pipe(map(() => this.siteConfig));
    }
}
