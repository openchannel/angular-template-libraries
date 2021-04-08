import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpRequestService} from './http-request-services';
import {mergeMap} from 'rxjs/operators';
import {FileDetails} from '../model/api/file-details-model';
import {ConfigService} from './config.service';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  private tokenUrl = 'v2/files/uploadToken';
  private uploadFileUrl = 'v2/files';

  constructor(private httpRequest: HttpRequestService,
              private http: HttpClient,
              private configService: ConfigService) {
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
    return this.configService.getMarketUrl()
      .pipe(mergeMap(marketUrl => {
        return this.http.post(`${marketUrl}/${this.uploadFileUrl}`, file, {
          headers: new HttpHeaders({'Upload-Token': `${token}`}),
          params: httpParams,
          reportProgress: true,
          observe: 'events',
        });
      }));
  }

  getToken() {
    return this.httpRequest.post(this.tokenUrl, null);
  }

  downloadFileDetails(fileId): Observable<FileDetails> {
    return this.httpRequest.get(`${this.uploadFileUrl}/byIdOrUrl?fileIdOrUrl=${fileId}`);
  }

  downloadFileFromUrl(fileUrl): Observable<any> {
    return this.http.get(fileUrl, {responseType: 'blob'});
  }

  getFileUrl(fileId: string): Observable<any> {
    return this.httpRequest.get(`${this.uploadFileUrl}/download?fileId=${fileId}`);
  }
}
