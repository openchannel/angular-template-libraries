import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CountryModel, StateModel } from '../model/api/country-state.model';

/**
 * Description: API service for getting countries list.<br>
 * Endpoints:<br>
 * GET 'https://restcountries.eu/rest/v2/all'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class CountryStateService {
    constructor(private http: HttpClient) {}
    /**
     * Description: Get countries data.
     * @returns {Observable<CountryModel[]>} `Observable<CountryModel[]>`
     * ### Example
     * `getCountries(): Observable<CountryModel[]>;`
     */
    getCountries(): Observable<CountryModel[]> {
        return this.http.get('https://countriesnow.space/api/v0.1/countries/iso').pipe(
            map((response: any) => {
                return response.data;
            }),
        );
    }
    /**
     * Description: Get states data.
     * @returns {Observable<StateModel[]>} `Observable<StateModel[]>`
     * ### Example
     * `getStates(country: CountryModel): Observable<StateModel[]>;`
     */
    getStates(country: CountryModel): Observable<StateModel[]> {
        return this.http.post('https://countriesnow.space/api/v0.1/countries/states', country).pipe(
            map((response: any) => {
                return response.data.states;
            }),
        );
    }
}
