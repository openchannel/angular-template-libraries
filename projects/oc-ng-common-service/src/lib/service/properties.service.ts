import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { toString } from 'lodash';
import { Page } from '../model/api/page.model';
import { OcPropertyModel } from '../model/api/properties.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PropertiesService {
    private readonly PROPERTIES = 'v2/properties';

    constructor(private httpRequest: HttpRequestService) {}

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
        return this.httpRequest.get(this.PROPERTIES, options);
    }
}
