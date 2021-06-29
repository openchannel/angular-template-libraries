import { Observable } from 'rxjs/internal/Observable';
import { camelCase, forIn, get, has } from 'lodash';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

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
