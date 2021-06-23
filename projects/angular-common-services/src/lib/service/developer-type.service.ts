import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { DeveloperTypeModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';


/**

 * Description: API service for getting Developer Type related data. <br>

 * Endpoints:<br>

 * GET 'v2/developerTypes'<br>

 * GET 'v2/developerTypes/{developerTypeId}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class DeveloperTypeService {
    private readonly BASIC_URL = 'v2/developerTypes';

    constructor(private httpRequest: HttpRequestService) {}

    /**
     *
     * Description: Get developer type data
     *
     * @param {string} developerTypeId
     * @param {any} httpOptions - (optional)
     * @returns {Observable<DeveloperTypeModel>} `Observable<DeveloperTypeModel>`
     *
     * * ### Example:
     *
     * `getDeveloperType('jas9d9a8sjd',{headers: {Authorization: 'Bearer ba87s687a6sdb7as67dh7as'}})`
     */
    getDeveloperType(developerTypeId: string, httpOptions?: any): Observable<DeveloperTypeModel> {
        const mainUrl = `${this.BASIC_URL}/${developerTypeId}`;
        return this.httpRequest.get(mainUrl, httpOptions);
    }

    /**
     *
     * Description: Get list of all developer types with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
     * @param {number} limit - (optional) Count apps into response. Starts from >= 1.
     * @param {string} query - (optional) Your specific search query.
     * @returns {Observable<Page<DeveloperTypeModel>>} `Observable<Page<DeveloperTypeModel>>`
     *
     * * ### Example:
     *
     * `getAllDeveloperTypes(1,10,"{"name": {"$in":["first", "second"]}}")`
     */
    getAllDeveloperTypes(pageNumber?: number, limit?: number, query?: string): Observable<Page<DeveloperTypeModel>> {
        return this.httpRequest.get(this.BASIC_URL, {
            params: new OcHttpParams().append('query', query).append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        });
    }
}
