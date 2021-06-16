import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { API_URL, OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string,
                private apiPaths: OcApiPaths) {
    }

    options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
    };

    get(url: string, options?: any): Observable<any> {
        return this.http.get(this.apiUrl + url, this.mergeHttpOptions(options));
    }

    post(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.post<any>(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    put(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.put(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    patch(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.patch(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    delete(url: string, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.delete(this.apiUrl + url, this.mergeHttpOptions(options)));
    }

    private reInitCSRF<T>(request: Observable<T>): Observable<T> {
        return request.pipe(
            catchError((error: HttpErrorResponse) => {
                if (error?.status === 403 && error?.error?.toLowerCase()?.includes('csrf')) {
                    return this.initCSRF().pipe(mergeMap(csrf => request));
                } else {
                    return throwError(error);
                }
            }),
        );
    }

    private initCSRF(): Observable<any> {
        return this.http.get(`${this.apiUrl}${this.apiPaths.authorization}/csrf`, this.options);
    }

    private mergeHttpOptions(newOptions: any): any {
        return newOptions ? {...this.options, ...newOptions} : this.options;
    }
}
