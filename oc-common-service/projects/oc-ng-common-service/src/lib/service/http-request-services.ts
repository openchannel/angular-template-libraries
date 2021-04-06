import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(private http: HttpClient, @Inject('environment') private environment) {
    }
    showLoader: string = '';
    options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    get(url: string, loader?: string, params?): Observable<any> {
        return this.http.get(this.environment.apiUrl + url, this.getOptions(loader, params));
    }

    post(url: string, body, loader?: string): Observable<any> {
        return this.http.post<any>(this.environment.apiUrl + url, body, this.getOptions(loader));
    }

    postMultipart(url: string, body: FormData): Observable<any> {
        return this.http.post<any>(this.environment.apiUrl + url, body);
    }

    put(url: string, body): Observable<any> {
        return this.http.put(this.environment.apiUrl + url, body, this.options);
    }

    patch(url: string, body): Observable<any> {
        return this.http.patch(this.environment.apiUrl + url, body, this.options);
    }

    delete(url: string): Observable<any> {
        return this.http.delete(this.environment.apiUrl + url, this.options);
    }

    login(url: string, body, headers): Observable<any> {
        return this.http.post<any>(this.environment.apiUrl + url, body, { headers });
    }


    getOptions(loader: string, qParams?) {
        let qHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (loader) {
            qHeaders = qHeaders.append("x-loader", loader);
        }
        let options = {
            headers: qHeaders,
            params: qParams
        };

        return options;
    }



}
