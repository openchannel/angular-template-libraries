import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('access_token');

        if (token && !request.url.endsWith('oauth/token')) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sImRldmVsb3BlcklkIjoiM2RjZmRkNDhlZDZiNGY5ZDhiNmEzZTIzZGViMzYyNDkiLCJ1c2VyX25hbWUiOiJ6Yi5yZWcucDI3QHlvcG1haWwuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNTk4NzEyNDM5LCJkZXZlbG9wZXJBY2NvdW50SWQiOiI2NzI2MzY2ZmEyNmU0NTU4YTVkNDI1YTI3Zjk4YWRiZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfUEVORElOR19SRUdJU1RSQVRJT04iXSwianRpIjoiNzBlZTFhMjktZWNjZC00YTFlLWFjZmMtN2VmZjc3MDkxYWQxIiwiY2xpZW50X2lkIjoiNDNtOXFiamlncjhlZDZpMWhldDFyZG5mc28ifQ.KL57G1Y1LmDjuZqknMV3uqbY00DG3a68npCdtFe-UI4') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        if (request.headers.get('x-loader')) {
            if (request.headers.get('x-loader') === 'true') {
                // this.loaderService.showLoader(request.url);
            }
            request = request.clone({ headers: request.headers.delete('x-loader') });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.loaderService.closeLoader(event.url);
                }
                return event;
            }),
            catchError((response: HttpErrorResponse) => {
                // this.loaderService.closeLoader(response.url);
                // if (response.status==404) {
                //     this.router.navigate(['/not-found']);       
                // }
                // if (response.status == 403) {
                //     this.notificationService.showError([{ error: '403 Forbidden: Access is denied' }]);
                // } else if (response.error && response.error['validation-errors']) {
                //     this.notificationService.showError(response.error['validation-errors']);
                // } else if (response.error.error_description) {
                //     this.notificationService.showError([{ error: response.error.error_description }]);
                // } else if (response.error.message) {
                //     this.notificationService.showError([{ error: response.error.message }]);
                // } else {
                //     this.notificationService.showError([{ error: JSON.stringify(response.error) }]);
                // }
                return throwError(response);
            }));
    }
}
