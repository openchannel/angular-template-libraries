import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountriesModel, CountryModel, StatesModel } from '../model/api/country-state.model';

/**
 * Description: API service for getting countries and states list.<br>
 * Link - https://documenter.getpostman.com/view/1134062/T1LJjU52?version=latest <br>
 * Version 0.1
 * Endpoints:<br>
 * GET 'https://countriesnow.space/api/v0.1/countries/iso'<br>
 * POST 'https://countriesnow.space/api/v0.1/countries/states'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class CountryStateService {
    constructor(private http: HttpClient) {}
    /**
     * Description: Get countries data.
     * @returns {Observable<CountriesModel>} `Observable<CountriesModel>`
     * ### Example
     * `getCountries(): Observable<CountriesModel>;`
     */
    getCountries(): Observable<CountriesModel> {
        return this.http.get<CountriesModel>('https://countriesnow.space/api/v0.1/countries/iso');
    }
    /**
     * Description: Get states of the chosen country.
     * @param {string} countryName (required) full name of the country
     * @param {HttpHeaders} headers (optional) additional headers for current request
     * @returns {Observable<StatesModel>} `Observable<StatesModel>`
     * ### Example
     * `getStates("United States"): Observable<StatesModel>;`
     */
    getStates(countryName: string, headers?: HttpHeaders): Observable<StatesModel> {
        const countryBody = {
            country: countryName,
        };
        return this.http.post<StatesModel>('https://countriesnow.space/api/v0.1/countries/states', countryBody, { headers });
    }
}
