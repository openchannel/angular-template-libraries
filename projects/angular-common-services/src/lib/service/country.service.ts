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
     * Description: Get states data.
     * @returns {Observable<StatesModel>} `Observable<StatesModel>`
     * ### Example
     * `getStates(country: CountryModel): Observable<StatesModel>;`
     */
    getStates(country: CountryModel, headers: HttpHeaders): Observable<StatesModel> {
        return this.http.post<StatesModel>('https://countriesnow.space/api/v0.1/countries/states', country, { headers });
    }
}
