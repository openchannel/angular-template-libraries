import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { get } from 'lodash';
import { OCMetaTagConfigType, MetaTagsPageConfig } from '../model/api/meta-tag.model';

/**
 * Service used for updating meta-tags in html <head> by current router link.
 *
 * @example
 *
 * // Part 1. Init meta tags config.
 * export const metaTagsConfig: MetaTagsPageConfig = {
 *    defaultMetaTags: [
 *        { name: 'author', content: 'OpenChannel' },
 *        { name: 'og:url', definitionPath: 'windowUrl' },
 *        { name: 'og:title', content: 'OpenChannel' },
 *        { name: 'og:image', content: 'OpenChannel' },
 *    ],
 *    pages: [
 *        {
 *            routerLinkStartsWith: '/',
 *            metaTags: [
 *                { name: 'description', content: 'Custom description.' },
 *                { name: 'og:title', content: 'Custom title.' },
 *                { name: 'og:image', content: 'Custom image.' },
 *            ],
 *        },
 *        {
 *            routerLinkStartsWith: '/details',
 *            metaTags: [
 *                { name: 'description', content: 'Default description text, when can\'t get data by definitionPath)', definitionPath: 'app.customData.summary' },
 *                { name: 'og:title', content: 'Default title text, when can\'t get data by definitionPath)', definitionPath: 'app.name' },
 *                { name: 'og:image', content: 'https://my.image.com/logo.svg', definitionPath: 'app.customData.logo' },
 *            ],
 *        },
 *    ],
 *};
 *
 * // Part 2. Implement abstract OCMetaTagService for providing meta tags config.
 *
 * _@Injectable({
 *    providedIn: 'root',
 *})
 * export class CustomMetaTagService extends OCMetaTagService {
 *    constructor(metaService: Meta, router: Router) {
 *        super(metaService, router);
 *    }
 *
 *    getMetaTagsConfig(): MetaTagsPageConfig {
 *        return metaTagsConfig;
 *    }
 *
 *    initDefaultPageDataForAllPages(): { [name: string]: any } {
 *        return {
 *            windowUrl: window.location.href,
 *        };
 *    }
 *}
 *
 * // Part 3. Provide this CustomMetaTagService in your main app component.
 *
 * _@Component({
 *    selector: 'app-root',
 *    templateUrl: './app.component.html',
 *    styleUrls: ['./app.component.scss'],
 *})
 * export class AppComponent {
 *    constructor(private customMetaTagService: CustomMetaTagService) {}
 * }
 *
 * // Part 4. (Optional). When used 'definitionPath' field. Like:
 * // {
 * //     routerLinkStartsWith: '/details',
 * //     metaTags: [
 * //         { name: 'description', content: 'Default description text, when can\'t get data by definitionPath)', definitionPath: 'app.customData.summary' },
 * //         { name: 'og:title', content: 'Default title text, when can\'t get data by definitionPath)', definitionPath: 'app.name' },
 * //         { name: 'og:image', content: 'https://my.image.com/logo.svg', definitionPath: 'app.customData.logo' },
 * //     ]
 * // }
 *
 *  _@Component({...})
 *  export class MyAppDetailsComponent implements OnInit {
 *     constructor(
 *         private appService: AppsService,
 *         private customMetaTagService: CustomMetaTagService
 *     ) {}
 *
 *     ngOnInit(): void {
 *         this.appService.getAppBySafeName('your-safe-name')
 *         .pipe(
 *             tap(appResponse => {
 *                     const bu = {
 *                         app: appResponse
 *                     };
 *                     this.customMetaTagService.pushSelectedFieldsToTempPageData(newBufferDataFiled);
 *             })
 *         ).subscribe();
 *     }
 * }
 *
 */
export abstract class OCMetaTagService {
    /**
     * Main meta tags config. See: {@link MetaTagsPageConfig}.
     */
    private metaTagsConfig: MetaTagsPageConfig = null;
    /**
     *  It is a buffer object with custom data.
     * Meta tags created with type {@link CustomMetaDefinition} will be use {@link OCMetaTagService.tempPageData} for getting data by path {@link CustomMetaDefinition#definitionPath}.
     */
    private tempPageData = {};
    /** List of meta tags patterns. See: {@link OCMetaTagConfigType} */
    private rawMetaTags: OCMetaTagConfigType[] = [];
    /** List of meta tags from the HTML <head>. When the router link changed, meta tags will be removed from HTML <head> */
    private existsMetaTags: HTMLMetaElement[] = [];

    constructor(private metaService: Meta, private router: Router) {
        // setup meta tags config for different pages.
        this.metaTagsConfig = this.getMetaTagsConfig();
        // listener for current URL
        this.router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                this.initDefaultPageMetaTagsByCurrentRouterLink(value.url);
            }
        });
    }

    /**
     * Abstract (required) function for getting meta tags config.
     * @return {@link MetaTagsPageConfig}
     */
    abstract getMetaTagsConfig(): MetaTagsPageConfig;

    /**
     * When routerLink changed, this function must init default values for {@link OCMetaTagService.tempPageData}.
     */
    abstract initDefaultPageDataForAllPages(): { [name: string]: any };

    /** Remove {@link OCMetaTagService.existsMetaTags} meta tags */
    clearPreviousMetaTagsFromHeader(): void {
        if (this.existsMetaTags) {
            this.existsMetaTags.forEach(tag => this.metaService.removeTagElement(tag));
        }
        this.existsMetaTags = [];
    }

    /** Set a new {@link OCMetaTagService.tempPageData}.*/
    setTempPageData<K extends {}>(tempData: K): void {
        this.tempPageData = tempData;
    }

    /** Get old (cloned) {@link OCMetaTagService.tempPageData}.*/
    getTempPageData(): any {
        return this.tempPageData ? { ...this.tempPageData } : {};
    }

    /**
     * Modify specific fields in {@link OCMetaTagService.tempPageData}. <br>
     * After this will be updated field 'content' in meta tags and pushed to HTML <head>
     * @example
     * this.ocMetaTagService.pushSelectedFieldsToTempPageData({
     *     app: {
     *         customData: {
     *             image: 'https://my.image.com/image.png
     *         }
     *     }
     * });
     */
    pushSelectedFieldsToTempPageData<K extends {}>(partOfTempPageData: K): void {
        if (!this.tempPageData) {
            this.tempPageData = {};
        }
        if (partOfTempPageData) {
            this.tempPageData = { ...this.tempPageData, ...partOfTempPageData };
        }
        this.pushMetaTagsToHtmlHead();
    }

    /**
     * Push current tags to HTML <head>.
     * Steps:
     * 1) Remove previous meta tags from HTML <head>.
     * 2) Merge default and custom (page) meta tags by 'name'. Fill content for custom meta tags {@link CustomMetaDefinition}.
     * 3) Push filled meta tags to HTML <head>.
     */
    private pushMetaTagsToHtmlHead(): void {
        this.clearPreviousMetaTagsFromHeader();
        this.existsMetaTags = this.metaService.addTags(this.fillContentFieldByTempSiteData(this.tempPageData, this.rawMetaTags));
    }

    /**
     * Merge default and specific (page) meta tags by field 'name'.
     */
    private fillContentFieldByTempSiteData<P extends OCMetaTagConfigType>(tempSiteData: any, metaTags: P[]): OCMetaTagConfigType[] {
        const metaNames: string[] = [];
        const uniqueMetaTags: OCMetaTagConfigType[] = [];

        (metaTags || []).forEach(mt => {
            if (mt.name && metaNames.indexOf(mt.name) === -1) {
                metaNames.push(mt.name);
                if (mt.definitionPath) {
                    uniqueMetaTags.push({
                        ...mt,
                        content: this.replaceHtmlTags(get(tempSiteData, mt.definitionPath, mt.content)),
                    });
                } else {
                    uniqueMetaTags.push({ ...mt });
                }
            }
        });
        return uniqueMetaTags;
    }

    private replaceHtmlTags(value: any): string | '' {
        if (typeof value === 'string' && value.match(/<[^>]*>/g)) {
            const tmp = document.createElement('div');
            tmp.innerHTML = value;
            return tmp.textContent || tmp.innerText || '';
        }
        return value ? String(value) : '';
    }

    private initDefaultPageMetaTagsByCurrentRouterLink(routerLink: string): void {
        // find meta tag config by current router link.
        const currentPage = (this?.getMetaTagsConfig().pages || []).find(
            page =>
                routerLink === page.routerLinkStartsWith ||
                (page.routerLinkStartsWith !== '/' && routerLink.startsWith(page.routerLinkStartsWith)),
        );
        this.rawMetaTags = currentPage
            ? [...(currentPage.metaTags || []), ...(this.metaTagsConfig.defaultMetaTags || [])]
            : [...(this.metaTagsConfig.defaultMetaTags || [])];
        this.pushSelectedFieldsToTempPageData(this?.initDefaultPageDataForAllPages());
    }
}
