import { Observable, of, Subject } from 'rxjs';
import { camelCase, forIn, get, has } from 'lodash';
import { catchError, map } from 'rxjs/operators';

export abstract class CMSSiteContentService {

    private cmsData: any;
    private modifyContentCMSSubject: Subject<boolean> = new Subject<boolean>();

    abstract getContentFromAPI(): Observable<any>;

    abstract getContentDefault(): any;

    initContent(): void {
        this.getContentFromAPI()
            .pipe(catchError(() => of(this.getContentDefault())))
            .subscribe(content => {
                this.cmsData = this.normalizeContentFiledNames(content);
                this.modifyContentCMSSubject.next();
            });
    }

    getContentByPath(path: string): Observable<any> {
        if (this.cmsData) {
            return of(this.tryGetContentByPath(this.cmsData, path));
        } else {
            return this.modifyContentCMSSubject.pipe(map(() => this.tryGetContentByPath(this.cmsData, path)));
        }
    }

    private tryGetContentByPath(cmsData: any, path: string): string {
        if (has(cmsData, path)) {
            return get(cmsData, path);
        } else {
            console.warn(`CMS content. Invalid content path: ${path}`);
            return undefined;
        }
    }

    private normalizeContentFiledNames(content: any): any {
        if (typeof content === 'object') {
            const newContent = Array.isArray(content) ? [] : {};
            forIn(content, (value, key) => {
                newContent[typeof key === 'string' ? camelCase(key) : key] = this.normalizeContentFiledNames(value);
            });
            return newContent;
        }
        return content;
    }
}
