import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { DeveloperTypeModel } from '../model/api/developer.model';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class DeveloperTypeService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getDeveloperType(developerTypeId: string, httpOptions?: any): Observable<DeveloperTypeModel> {
        const mainUrl = `${this.apiPaths.developerTypes}/${developerTypeId}`;
        return this.httpRequest.get(mainUrl, httpOptions);
    }

    getAllDeveloperTypes(pageNumber: number, limit: number, query?: string): Observable<Page<DeveloperTypeModel>> {
        return this.httpRequest.get(this.apiPaths.developerTypes, {
            params: new OcHttpParams().append('query', query).append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        });
    }
}
