import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { SiteContentResponse } from '../model/api/custom-content.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class SiteContentService {
    private readonly CONTENT_URL = 'v2/sites';

    constructor(private httpService: HttpRequestService) {}

    getContentById(siteId: string, contentId: string, headers: HttpHeaders = new HttpHeaders()): Observable<SiteContentResponse> {
        const config = `${this.CONTENT_URL}/${siteId}/content/${contentId}`;
        return this.httpService.get(config, { headers });
    }
}
