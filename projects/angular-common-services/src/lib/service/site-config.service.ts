import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {SiteConfig} from '../model/components/frontend.model';
import {TitleService} from './title.service';
import { Observable } from 'rxjs/internal/Observable';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

/**

 * Description: Service for setting up site config.<br> 

 * @param {string} siteConfig 

 * Methods:

 * setMeta

 * setFavicon

 * initSiteConfiguration

 */
@Injectable({
  providedIn: 'root',
})
export class SiteConfigService {

  siteConfig: SiteConfig;
  private siteConfigSetupTrigger: Subject<void> = new Subject<void>();

  constructor(private titleService: TitleService,
              private metaService: Meta) {
  }

  /**
   * Description: Set up meta tags from the Site Config
   * 
   * @returns {void}
   * 
   * * ### Example:
   *``
   * setMeta()
   *``
   */
  setMeta() {
    this.metaService.addTags(this.siteConfig.metaTags);
  }

  /**
   * Desctiption: Set up the favicon for the app
   * 
   * @param {string} customPath - (optional) path to the favicon icon
   * @param {string} customIconType - (optional) type of the favicon icon. Default: 'image/x-icon'
   * @returns {void}
   * 
   * * ### Example:
   *``
   * setFavicon('/path/img', 'png')
   *``
   */
  setFavicon(customPath?: string, customIconType?: string) {
    const iconLink: HTMLLinkElement = document.querySelector('#custom-favicon');
    if (iconLink) {
      iconLink.href = customPath ? customPath : this.siteConfig.favicon.href;
      iconLink.type = customIconType ? customIconType :
        this.siteConfig.favicon.type ? this.siteConfig.favicon.type : 'image/x-icon';
    } else {
      const linkElement = document.createElement( 'link' );
      linkElement.setAttribute( 'id', 'custom-favicon' );
      linkElement.setAttribute( 'rel', 'icon' );
      linkElement.setAttribute( 'type',
        customIconType ? customIconType :
          this.siteConfig.favicon.type ? this.siteConfig.favicon.type : 'image/x-icon');
      linkElement.setAttribute( 'href', customPath ? customPath : this.siteConfig.favicon.href);
      document.head.appendChild( linkElement );
    }
  }

  /**
   * Description: Set up a site by the Site Config
   * 
   * @param {SiteConfig} config - Set initial site configuration
   * @returns {void} 
   * 
   * * ### Example:
   *``
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
   *``
   */
  initSiteConfiguration(config: SiteConfig) {
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
