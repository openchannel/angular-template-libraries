import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Description: API service for getting countries list.<br>
 * Endpoints:<br>
 * GET 'https://restcountries.eu/rest/v2/all'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class CountryStateService {
    /**
     * Description: Get countries data.
     * @returns {Observable<any>} `Observable<any>`
     * ### Example
     * `getCountry();`
     */

    countries: any;
    
    constructor(private http: HttpClient) {}

    getCountries(): Observable<any> {
        return this.http.get('https://restcountries.com/v3.1/all').pipe(map(result => (this.countries = result)));
    }
}
