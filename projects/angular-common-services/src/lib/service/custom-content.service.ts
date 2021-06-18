import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { SiteContentModel } from '../model/api/custom-content.model';

@Injectable({
    providedIn: 'root',
})
export class CustomContentService {
    private readonly CONTENT_URL = 'v2/sites';
    private readonly SITE_ID = '6081cb52a28350643d6e7658';

    constructor(private httpService: HttpRequestService) {}

    getConfig(contentId: string): Observable<SiteContentModel> {
        const config = `${this.CONTENT_URL}/${this.SITE_ID}/content/${contentId}`;
        return this.httpService.get(config);
    }
}
