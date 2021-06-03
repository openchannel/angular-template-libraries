import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequestService } from './http-request-services';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { FileDetailsResponse } from '../model/api/file-details-model';


/**

 * Description: API service for getting and modifying User Account model.<br>

 * Endpoints:<br>

 * POST 'v2/files/uploadToken'<br>

 * GET 'v2/userAccounts/this'<br>

 * POST '{marketUrl}/v2/files'

 * GET '/v2/files/byIdOrUrl'

 * GET '/v2/files/download'

 * GET {fileUrl}

 */
@Injectable({
    providedIn: 'root',
})
export class FileUploadDownloadService {
    private tokenUrl = 'v2/files/uploadToken';
    private uploadFileUrl = 'v2/files';

    constructor(public httpRequest: HttpRequestService, private http: HttpClient, private configService: ConfigService) {}

    /**
     *
     * Description: Get Token and upload file to open channel
     *
     * @param {FormData} file - File from formData
     * @param {boolean} isPrivate
     * @param {string[]} hash - (optional) file hash
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `uploadToOpenChannel({file},true, ['na0s78hd09a8shd90ahsd'])`
     */
    uploadToOpenChannel(file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
        return this.getToken().pipe(mergeMap(res => this.prepareUploadReq(res.token, file, isPrivate, hash)));
    }

    /**
     *
     * Desctiption: Prepare upload request and upload file
     *
     * @param {any} token - Token for channel
     * @param {FormData} file - File from formData
     * @param {boolean} isPrivate
     * @param {string[]} hash - (optional) file hash
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `prepareUploadReq('0a897shd0897ahs09d8has9d7',{file},true, ['na0s78hd09a8shd90ahsd'])`
     */
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
                return this.http.post(`${marketUrl}/${this.uploadFileUrl}`, file, {
                    headers: new HttpHeaders({ 'Upload-Token': `${token}` }),
                    params: httpParams,
                    reportProgress: true,
                    observe: 'events',
                });
            }),
        );
    }

    /**
     *
     * Description: Get token for a channel
     *
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `getToken();`
     */
    getToken(): Observable<any> {
        return this.httpRequest.post(this.tokenUrl, null);
    }

    /**
     *
     * Description: Get file details
     *
     * @param {string} fileId
     * @returns {Observable<FileDetailsResponse>} `Observable<FileDetailsResponse>`
     *
     * * ### Example:
     *
     * `downloadFileDetails('ha98s7dh8a7shd87');`
     */
    downloadFileDetails(fileId: string): Observable<FileDetailsResponse> {
        return this.httpRequest.get(`${this.uploadFileUrl}/byIdOrUrl?fileIdOrUrl=${fileId}`);
    }

    /**
     *
     * Description: Download file from provided URL
     *
     * @param {string} fileUrl
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `downloadFileFromUrl('/image.jpg');`
     */
    downloadFileFromUrl(fileUrl: string): Observable<any> {
        return this.http.get(fileUrl, { responseType: 'blob' });
    }

    /**
     *
     * Description: Get file URL
     *
     * @param {string} fileId
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `getFileUrl('/image.jpg');`
     */
    getFileUrl(fileId: string): Observable<any> {
        return this.httpRequest.get(`${this.uploadFileUrl}/download?fileId=${fileId}`);
    }
}
