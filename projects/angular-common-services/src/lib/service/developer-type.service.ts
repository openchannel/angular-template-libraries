import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { DeveloperTypeModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class DeveloperTypeService {
    private BASIC_URL;

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
        this.BASIC_URL = apiPaths.developerTypes;
    }

    getDeveloperType(developerTypeId: string, httpOptions?: any): Observable<DeveloperTypeModel> {
        const mainUrl = `${this.BASIC_URL}/${developerTypeId}`;
        return this.httpRequest.get(mainUrl, httpOptions);
    }

    getAllDeveloperTypes(pageNumber: number, limit: number, query?: string): Observable<Page<DeveloperTypeModel>> {
        return this.httpRequest.get(this.BASIC_URL, {
            params: new OcHttpParams().append('query', query).append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        });
    }
}
