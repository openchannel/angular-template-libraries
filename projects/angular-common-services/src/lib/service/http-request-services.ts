import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { API_URL, OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: Service for setting up site config.<br>
 * @param {{ headers: HttpHeaders; withCredentials: boolean;}} options (default: `{headers: { 'Content-Type': 'application/json' }, withCredentials: true}`) - default Http options
 * Methods:
 *
 * get
 *
 * post
 *
 * put
 *
 * patch
 *
 * delete
 */
@Injectable({
    providedIn: 'root',
})
export class HttpRequestService {
    options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
    };
    constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: GET request with additional http options
     *
     * @param {string} url - (required) URL string
     * @param {any} options - (optional) any Http options
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * get('/users', {observe: 'body', reportProgress: true})
     */
    get(url: string, options?: any): Observable<any> {
        return this.http.get(this.apiUrl + url, this.mergeHttpOptions(options));
    }

    /**
     *
     * Description: POST request with provided body and additional http options
     *
     * @param {string} url - (required) URL string
     * @param {any} body - (required) Http body
     * @param {any} options - (optional) any Http options
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * post('/users', {name:'User', password: 'password'}, {observe: 'body', reportProgress: true})
     */
    post(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.post<any>(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    /**
     *
     * Description: PUT request with provided body and additional http options
     *
     * @param {string} url - (required) URL string
     * @param {any} body - (required) Http body
     * @param {any} options - (optional) any Http options
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * put('/users/sd7yf0987sdhf970', {name:'User', password: 'password'}, {observe: 'body', reportProgress: true})
     */
    put(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.put(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    /**
     *
     * Description: PATCH request with provided body and additional http options
     *
     * @param {string} url - (required) URL string
     * @param {any} body - (required) Http body
     * @param {any} options - (optional) any Http options
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * patch('/users/sd7yf0987sdhf970', {name:'User', password: 'password'}, {observe: 'body', reportProgress: true})
     */
    patch(url: string, body, options?: any): Observable<any> {
        return this.reInitCSRF(this.http.patch(this.apiUrl + url, body, this.mergeHttpOptions(options)));
    }

    /**
     *
     * Description: DELETE request with additional http options
     *
     * @param {string} url - (required) URL string
     * @param {any} options - (optional) any Http options
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * delete('/users/sd7yf0987sdhf970', {reportProgress: true})
     */
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
        return newOptions ? { ...this.options, ...newOptions } : this.options;
    }
}
