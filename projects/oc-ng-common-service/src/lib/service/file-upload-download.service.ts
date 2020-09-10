import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpRequestService} from './http-request-services';
import {mergeMap} from 'rxjs/operators';
import {FileDetails} from '../model/file-details-model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  private readonly openChannelUrl: string;

  private tokenUrl = 'api/v1/guest/file-upload-token';
  private downloadFileUrl = 'api/v1/user/download-file';
  private uploadFileUrl = 'v2/files';

  constructor(private httpRequest: HttpRequestService,
              private http: HttpClient,
              @Inject('environment') private environment) {
    this.openChannelUrl = `${this.environment.openchannelUrl}${this.environment.openchannelUrl.endsWith('/') ? '' : '/'}`;
  }

  uploadToOpenChannel(file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
    return this.getToken().pipe(mergeMap(res => this.prepareUploadReq(res.token, file, isPrivate, hash)));
  }

  prepareUploadReq(token, file: FormData, isPrivate: boolean, hash?: string[]): Observable<any> {
    const httpParams = new HttpParams();
    if (isPrivate !== null) {
      httpParams.set('isPrivate', `${isPrivate}`);
    }
    if (hash && hash.length > 0) {
      httpParams.set('hash', hash.join(','));
    }

    const url = `${this.openChannelUrl}${this.uploadFileUrl}`;

    return this.http.post(url, file, {
      headers: new HttpHeaders({ 'Upload-Token': `${token}`}),
      params: httpParams,
      reportProgress: true,
    });
  }

  getToken() {
    return this.httpRequest.get(this.tokenUrl);
  }

  downloadFileDetails(fileId): Observable<FileDetails> {
    return this.httpRequest.get(this.downloadFileUrl + '?fileId=' + fileId);
  }

  downloadFileFromUrl(fileUrl): Observable<any> {
    return this.http.get(fileUrl, {responseType: 'blob'});
  }
}
