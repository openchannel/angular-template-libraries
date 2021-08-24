import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, filter, finalize, tap } from 'rxjs/operators';
import { HttpEvent, HttpResponse, HttpResponseBase } from '@angular/common/http';

/**
 * Description: This service for the Netlify pre-rendering. It's getting data about requests, changing pre-render status
 * and creating special meta tags.
 */
@Injectable({
    providedIn: 'root',
})
export class PrerenderRequestsWatcherService {
    private buffer: HttpEvent<any>[] = [];

    private sleepAfterLastRequestMS = 1000;
    private requestCount = 0;

    /**
     * Adding a new observable with api request to the watcher. This function checking of the all requests fulfillment.
     * @param httpEvent observable with a request data
     */
    addHttpEvent(httpEvent: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
        this.setPrerenderStatus(false);
        this.requestCount++;
        return httpEvent.pipe(
            tap(response => this.buffer.push(response)),
            catchError(error => {
                this.buffer.push(error);
                return throwError(error);
            }),
            finalize(() => this.handleLastResponse()),
        );
    }

    /** HttpEvent<any> | HttpErrorResponse ? */
    handleLastResponse(): void {
        of(1)
            .pipe(
                delay(this.sleepAfterLastRequestMS),
                tap(() => this.requestCount--),
                filter(() => this.requestCount === 0),
            )
            .subscribe(() => {
                setTimeout(() => this.checkErrorsOrChangeStatus(this.buffer as HttpResponse<any>[]), 3000);
            });
    }
    /**
     * Checking of api error responses and changing pre-render status.
     * @param responses array of the responses
     */
    checkErrorsOrChangeStatus(responses: HttpEvent<any>[]): void {
        const anyError: HttpEvent<any>[] = responses.filter(resp => resp instanceof HttpResponseBase && resp?.status >= 300);
        this.setPrerenderStatus(anyError.length === 0);
    }

    /**
     * Changing the prerender status. Creating a special flag for the Netlify pre-render.
     * @param ready status of the page. Ready or not for prerender.
     * `true` means that all requests are done and page is ready.
     */
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

    /**
     * Creation the special 404 meta tag for the pre-render.
     */
    create404MetaTag(): void {
        const meta404 = document.createElement('meta');
        meta404.name = 'prerender-status-code';
        meta404.content = '404';
        meta404.id = 'prerender404';
        document.getElementsByTagName('head')[0].appendChild(meta404);
    }

    /**
     * Removing the 404 meta tag for the pre-render
     */
    remove404MetaTag(): void {
        document.querySelector('#prerender404').remove();
    }

    /**
     * Creation of the special 301 meta tags for the pre-render.
     * @param location new page location for the search crawlers
     */
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

    /**
     * Clearing all of the prerender tags
     */
    clearPrerenderMeta(): void {
        document.querySelectorAll('meta').forEach(item => {
            if (item.name.includes('prerender')) {
                item.remove();
            }
        });
    }
}
