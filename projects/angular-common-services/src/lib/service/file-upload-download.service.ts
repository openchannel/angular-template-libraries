import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequestService } from './http-request-services';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { FileDetailsResponse } from '../model/api/file-details-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class FileUploadDownloadService {

    constructor(public httpRequest: HttpRequestService, private http: HttpClient, private configService: ConfigService,
                private apiPaths: OcApiPaths) {
    }

    uploadToOpenChannel(file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
        return this.getToken().pipe(mergeMap(res => this.prepareUploadReq(res.token, file, isPrivate, hash)));
    }

    prepareUploadReq(token, file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
        let httpParams = new OcHttpParams();
        if (isPrivate) {
            httpParams = httpParams.set('isPrivate', `${isPrivate}`);
        }
        if (hash?.length > 0) {
            httpParams = httpParams.set('hash', hash.join(','));
        }
        return this.configService.getMarketUrl().pipe(
            mergeMap(marketUrl => {
                return this.http.post(`${marketUrl}/${this.apiPaths.files}`, file, {
                    headers: new HttpHeaders({ 'Upload-Token': `${token}` }),
                    params: httpParams,
                    reportProgress: true,
                    observe: 'events',
                });
            }),
        );
    }

    getToken() {
        return this.httpRequest.post(`${this.apiPaths.files}/uploadToken`, null);
    }

    downloadFileDetails(fileId): Observable<FileDetailsResponse> {
        return this.httpRequest.get(`${this.apiPaths.files}/byIdOrUrl?fileIdOrUrl=${fileId}`);
    }

    downloadFileFromUrl(fileUrl): Observable<any> {
        return this.http.get(fileUrl, { responseType: 'blob' });
    }

    getFileUrl(fileId: string): Observable<any> {
        return this.httpRequest.get(`${this.apiPaths.files}/download?fileId=${fileId}`);
    }
}
