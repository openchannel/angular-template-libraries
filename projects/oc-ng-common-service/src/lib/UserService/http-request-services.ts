import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(private http: HttpClient) { }
    showLoader: string = '';
    options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    get(url: string, loader?: string, params?): Observable<any> {
        return this.http.get(environment.apiUrl + url, this.getOptions(loader, params));
    }

    post(url: string, body, loader?: string): Observable<any> {
        return this.http.post<any>(environment.apiUrl + url, body, this.getOptions(loader));
    }

    postMultipart(url: string, body: FormData): Observable<any> {
        return this.http.post<any>(environment.apiUrl + url, body);
    }

    put(url: string, body): Observable<any> {
        return this.http.put(environment.apiUrl + url, body, this.options);
    }

    patch(url: string, body): Observable<any> {
        return this.http.patch(environment.apiUrl + url, body, this.options);
    }

    delete(url: string): Observable<any> {
        return this.http.delete(environment.apiUrl + url, this.options);
    }

    login(url: string, body, headers): Observable<any> {
        return this.http.post<any>(environment.apiUrl + url, body, { headers });
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
