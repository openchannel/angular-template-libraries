import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BroadcastChannel } from 'broadcast-channel';
import { API_URL } from '../oc-ng-common-service.module';

export const XSRF_HEADER_NAME = new InjectionToken<string>('XSRF_HEADER_NAME');

export const channel = new BroadcastChannel('openchannel-csrf-sync');

/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
@Injectable()
export class HttpXsrfExtractor implements HttpInterceptor {
    constructor(@Inject(XSRF_HEADER_NAME) private headerName: string, private memoryStorage: MemoryStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    const xsrfToken = event.headers.get(this.headerName);
                    if (xsrfToken) {
                        this.memoryStorage.setXsrfToken(xsrfToken);
                    }
                }
                return event;
            }),
        );
    }
}

/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
    constructor(
        private memoryStorageService: MemoryStorageService,
        @Inject(XSRF_HEADER_NAME) private headerName: string,
        @Inject(API_URL) private apiUrl: string,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.memoryStorageService.getXsrfToken();

        // Be careful not to overwrite an existing header of the same name.
        if (!this.apiUrl || req.url.startsWith(this.apiUrl)) {
            if (token && !req.headers.has(this.headerName)) {
                req = req.clone({ headers: req.headers.set(this.headerName, token) });
            }
        }
        return next.handle(req);
    }
}

@Injectable({
    providedIn: 'root',
})
export class MemoryStorageService implements OnDestroy {
    private xsrfToken: string;

    constructor() {
        channel.onmessage = msg => {
            this.xsrfToken = msg.data;
        };
    }

    ngOnDestroy(): void {
        channel.close();
    }

    getXsrfToken(): string {
        return this.xsrfToken;
    }

    setXsrfToken(xsrfToken: string): void {
        channel.postMessage(xsrfToken);
        this.xsrfToken = xsrfToken;
    }
}
