import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { SiteContentResponse } from '../model/api/custom-content.model';

@Injectable({
    providedIn: 'root',
})
export class SiteContentService {
    private readonly CONTENT_URL = 'v2/sites';
    private readonly SITE_ID = '601ac2acd0c0c60baf6545f8';

    constructor(private httpService: HttpRequestService) {}

    getConfig(contentId: string): Observable<SiteContentResponse> {
        const config = `${this.CONTENT_URL}/${this.SITE_ID}/content/${contentId}`;
        return this.httpService.get(config);
    }
}
