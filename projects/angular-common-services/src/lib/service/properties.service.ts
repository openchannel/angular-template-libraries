import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { toString } from 'lodash';
import { Page } from '../model/api/page.model';
import { OcPropertyModel } from '../model/api/properties.model';
import { HttpHeaders } from '@angular/common/http';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting Page Property.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/properties'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class PropertiesService {
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Get list of Properties with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} pageLimit - (optional) Count user types into response. Starts from >= 1
     * @param {string} sort - (optional) Sort user types by specific field
     * @param {string} query - (optional) Your specific search query
     * @param {HttpHeaders} headers (optional)
     * @returns {Observable<Page<OcPropertyModel>>} `Observable<Page<OcPropertyModel>>`
     *
     * ### Example
     *
     * `getProperties( "{"name": {"$in":["first", "second"]}}", "{"name": 1}",1,10,{"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"})`
     */
    getProperties(
        query?: string,
        sort?: string,
        pageNumber?: number,
        pageLimit?: number,
        headers?: HttpHeaders,
    ): Observable<Page<OcPropertyModel>> {
        const options: any = {
            params: new OcHttpParams()
                .append('query', query)
                .append('sort', sort)
                .append('pageNumber', toString(pageNumber))
                .append('limit', toString(pageLimit)),
        };
        if (headers) {
            options.headers = headers;
        }
        return this.httpRequest.get(this.apiPaths.properties, options);
    }
}
