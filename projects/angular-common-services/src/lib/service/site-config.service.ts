import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SiteConfig} from '../model/components/frontend.model';
import {TitleService} from './title.service';
import { Observable } from 'rxjs/internal/Observable';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SiteConfigService {

  siteConfig: SiteConfig;
  private siteConfigSetupTrigger: Subject<void> = new Subject<void>();

  constructor(private titleService: TitleService,
              private router: Router,
              private metaService: Meta) {
  }

  /**
   * Set up meta tags from the Site Config
   */
  setMeta() {
    this.metaService.addTags(this.siteConfig.metaTags);
  }

  /**
   * Set up the favicon for the app
   * @param customPath path to the favicon icon
   * @param customIconType type of the favicon icon. Default: 'image/x-icon'
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
   * Set up a site by the Site Config
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
