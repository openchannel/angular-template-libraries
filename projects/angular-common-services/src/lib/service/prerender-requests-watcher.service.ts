import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, delay, takeUntil } from 'rxjs/operators';
import { HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PrerenderRequestsWatcherService {
    private buffer: Observable<HttpEvent<any>>[] = [];
    private close = new Subject<void>();
    private sleepAfterLastRequestMS = 1000;

    constructor() {}

    addHttpEvent(httpEvent: Observable<HttpEvent<any>>): void {
        this.setPrerenderStatus(false);
        this.close.next();
        this.buffer.push(
            httpEvent.pipe(
                catchError(error => {
                    if (error.status === 301) {
                        this.create301MetaTag(error.location);
                    }
                    return of(error);
                }),
            ),
        );
        forkJoin(this.buffer)
            .pipe(delay(this.sleepAfterLastRequestMS), takeUntil(this.close))
            .subscribe((responses: HttpResponse<any>[]) => {
                this.checkErrorsOrChangeStatus(responses);
            });
    }

    checkErrorsOrChangeStatus(responses: HttpResponse<any>[]): void {
        const anyError: HttpResponse<any>[] = responses.filter(resp => resp?.status >= 300);
        this.setPrerenderStatus(anyError.length === 0);
    }

    setPrerenderStatus(ready: boolean): void {
        const createdScript = document.querySelector('#renderScript');
        if (createdScript) {
            createdScript.textContent = `document.prerenderReady = ${ready};`;
        } else {
            const renderScript = document.createElement('script');
            renderScript.type = 'text/javascript';
            renderScript.src = '';
            renderScript.textContent = `document.prerenderReady = ${ready};`;
            renderScript.id = 'renderScript';
            document.getElementsByTagName('head')[0].prepend(renderScript);
        }
    }

    create404MetaTag(): void {
        const meta404 = document.createElement('meta');
        meta404.name = 'prerender-status-code';
        meta404.content = '404';
        meta404.id = 'prerender404';
        document.getElementsByTagName('head')[0].appendChild(meta404);
    }

    remove404MetaTag(): void {
        document.querySelector('#prerender404').remove();
    }

    create301MetaTag(location: string): void {
        const meta303 = document.createElement('meta');
        const meta303Redirect = document.createElement('meta');

        meta303.name = 'prerender-status-code';
        meta303.content = '301';
        meta303Redirect.name = 'prerender-header';
        meta303Redirect.content = `Location: ${location}`;
        document.getElementsByTagName('head')[0].appendChild(meta303);
        document.getElementsByTagName('head')[0].appendChild(meta303Redirect);
    }

    clearPrerenderMeta(): void {
        document.querySelectorAll('meta').forEach(item => {
            if (item.name.includes('prerender')) {
                item.remove();
            }
        });
    }
}
