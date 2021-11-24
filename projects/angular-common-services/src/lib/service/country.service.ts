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
    countries: any;
    states: any;
    
    constructor(private http: HttpClient) {}
    /**
     * Description: Get countries data.
     * @returns {Observable<any>} `Observable<any>`
     * ### Example
     * `getCountries();`
     */
    getCountries(): Observable<any> {
        return this.http.get('https://countriesnow.space/api/v0.1/countries/iso').pipe(map(result => (this.countries = result)));
    }
    /**
     * Description: Get states data.
     * @returns {Observable<any>} `Observable<any>`
     * ### Example
     * `getStates(country);`
     */
    getStates(country: any): Observable<any> {
        return this.http.post('https://countriesnow.space/api/v0.1/countries/states', country).pipe(map(result => (this.states = result)));
    }
}
