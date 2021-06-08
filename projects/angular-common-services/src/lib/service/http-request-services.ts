import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { API_URL } from '../../public-api';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    private API_URL: string;

    constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) {
        this.API_URL = apiUrl;
    }

    options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
    };

    get(url: string, options?: any): Observable<any> {
        return this.http.get(this.API_URL + url, this.mergeHttpOptions(options));
    }

    post(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.post<any>(this.API_URL + url, body, this.mergeHttpOptions(options)));
    }

    put(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.put(this.API_URL + url, body, this.mergeHttpOptions(options)));
    }

    patch(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.patch(this.API_URL + url, body, this.mergeHttpOptions(options)));
    }

    delete(url: string, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.delete(this.API_URL + url, this.mergeHttpOptions(options)));
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
        return this.http.get(this.API_URL + AuthenticationService.INIT_CSRF_URL, this.options);
    }

    private mergeHttpOptions(newOptions: any): any {
        return newOptions ? {...this.options, ...newOptions} : this.options;
    }
}
