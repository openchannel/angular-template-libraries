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
                    console.log('error occurred', error.status);
                    return of(error);
                }),
            ),
        );
        forkJoin(this.buffer)
            .pipe(delay(this.sleepAfterLastRequestMS), takeUntil(this.close))
            .subscribe((responses: HttpResponse<any>[]) => {
                console.log('All responses count:', responses.length, ' data: ', responses);
                this.checkErrorsOrChangeStatus(responses);
            });
    }

    checkErrorsOrChangeStatus(responses: HttpResponse<any>[]): void {
        const anyError: HttpResponse<any>[] = responses.filter(resp => resp?.status !== 200);
        console.log('founded errors', anyError);
        if (anyError.length === 0) {
            this.setPrerenderStatus(true);
        }
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
}
