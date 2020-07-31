import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpRequestService } from './http-request-services';
import { mergeMap,map } from 'rxjs/operators'
import { FileDetails } from '../model/file-details-model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadDownloadService {

  private tokenUrl = 'guest/file-upload-token';
  private downloadFileUrl = '/user/download-file';

  constructor(private httpRequest: HttpRequestService,private http: HttpClient, @Inject('environment') private environment) { }

  uploadToOpenchannel(file: FormData, isPrivate=true): Observable<any>{
    let tokenRes = this.getToken().pipe(map(res => {
      let token = res['token'];
      return token;
    }),mergeMap(token =>this.prepareUploadReq(token,file,isPrivate)));
    return tokenRes;
  }

  prepareUploadReq(token,file,isPrivate): Observable<any>{
    let query = '';
    if (isPrivate !== null) {
      query = `?isPrivate=${isPrivate}`;
    }
    let openchannelUrl = this.environment.openchannelUrl+this.environment.openchannelUrl.endsWith('/')?'':'/'
                +"/v2/files";
    let options = {
      headers: new HttpHeaders({ 'Upload-Token': `${token}`}),
      reportProgress: true
    };
      const req = new HttpRequest('POST', `${openchannelUrl}${query}`, file, options);
    return this.http.request(req);
  }
  
  getToken(){
    let tokenUrl = this.environment.apiUrl+this.tokenUrl;
    return this.httpRequest.get(tokenUrl);
  }

  downloadFileDetails(fileId): Observable<FileDetails>{
    return this.httpRequest.get(this.downloadFileUrl+"?fileId="+fileId);
  }

  downloadFileFromUrl(fileUrl): Observable<any>{
    return this.http.get(fileUrl, {responseType: "blob"});
  }
}
