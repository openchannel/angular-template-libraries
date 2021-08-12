import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { PrerenderRequestsWatcherService } from '../service/prerender-requests-watcher.service';
import { PrerenderEndpointsConfig } from '../model/api/prerender-endpoints-config.model';
import isbot from 'isbot';

@Injectable()
export class HttpRequestsWatcherInterceptor implements HttpInterceptor {
    constructor(private endpoints: PrerenderEndpointsConfig, private requestWatcher: PrerenderRequestsWatcherService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const event = next.handle(request);
        const notForBotUrl = this.endpoints.excludeAPICall.find(url => request.url.includes(url));

        if (isbot(request.headers.get('User-Agent')) && notForBotUrl) {
            return EMPTY;
        }

        this.requestWatcher.addHttpEvent(event);
        return event;
    }
}
