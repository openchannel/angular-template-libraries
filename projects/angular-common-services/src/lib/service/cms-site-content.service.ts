import { Observable } from 'rxjs/internal/Observable';
import { forIn, get, has } from 'lodash';
import { catchError, defaultIfEmpty, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

/**
 * Abstract RXJS service for working with CMS site data.<br>
 * Note (Important!): After creating service execute function {@link #initContent}<br>
 *
 * @example implementation
 *
 * import defaultCMSContent from '.../assets/content/_defaultContent.json';
 * import { CMSSiteContentService, SiteContentService } from '@openchannel/angular-common-services';
 *
 * @Injectable({
 *    providedIn: 'root',
 * })
 * export class CmsContentService extends CMSSiteContentService {
 *
 *   constructor(private contentAPIService: SiteContentService) {
 *       super();
 *       super.initContent();
 *   }
 *
 *   getContentFromAPI(): Observable<any> {
 *      return this.contentAPIService.getContentById('siteId', 'contentId')
 *             .pipe(map(response => response.customData))
 *   }
 *
 *   getContentDefault(): any {
 *         return defaultCMSContent;
 *   }
 * }
 *
 * @example usage
 * constructor(private cmsService: CmsContentService) {...}
 *
 * this.cmsService
 *  .getContentByPaths({
 *         logoImageURL: 'default-footer.logo',
 *         contentColumns: 'default-footer.menu.items',
 *   })
 *   .subscribe(content => {
 *         this.cmsData.logoImageURL = content.logoImageURL as string;
 *         this.cmsData.contentColumns = content.contentColumns as [];
 *   });
 * }
 */

export abstract class CMSSiteContentService {
    private cmsData: any;
    private modifyContentCMSSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Get content from API. Result data structure mast be equals data from {@link #getContentDefault}
     * When will throw an Error or Observable will be empty, service will use data from {@link #getContentDefault}
     * @return Observable<any> - your CMS data.
     */
    abstract getContentFromAPI(): Observable<any>;

    /**
     * Get local content. Use when {@link #getContentFromAPI} did not work correctly.
     * @return any - your CMS data.
     */
    abstract getContentDefault(): any;

    /**
     * Getting content from API or local data.
     */
    initContent(): void {
        this.getContentFromAPI()
            .pipe(
                catchError(() => of(this.getContentDefault())),
                defaultIfEmpty(this.getContentDefault()),
            )
            .subscribe(content => {
                this.cmsData = content || {};
                this.modifyContentCMSSubject.next();
            });
    }

    /**
     * Returns content by paths. See 'usage' section in {@link #CMSSiteContentService}
     */
    getContentByPaths<P>(paths: P): Observable<{ [PK in keyof P]: any }> {
        if (this.cmsData) {
            return of(this.findContentByPaths(paths));
        } else {
            return this.modifyContentCMSSubject.pipe(map(() => this.findContentByPaths(paths)));
        }
    }

    private findContentByPaths<P>(paths: P): { [PK in keyof P]: any } {
        const tempPathsData = { ...paths };
        Object.keys(tempPathsData).forEach(key => (tempPathsData[key] = null));
        forIn(paths, (path, name) => (tempPathsData[name] = this.tryGetContentByPath(this.cmsData, path)));
        return tempPathsData;
    }

    private tryGetContentByPath(cmsData: any, path: string): string {
        if (has(cmsData, path)) {
            return get(cmsData, path);
        } else {
            console.warn(`CMS content. Invalid content path: ${path}`);
            return undefined;
        }
    }
}
