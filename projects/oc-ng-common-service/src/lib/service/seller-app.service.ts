import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerAppService {

  private url = 'api/v1/apps';

  constructor(private httpRequest: HttpRequestService) { }

  saveApplication(appDetails) {
    return this.httpRequest.post(this.url, appDetails);
  }

  submitApplication(appDetails) {
    return this.httpRequest.post(this.url + "/submit", appDetails);
  }

  getApps(loader: string): Observable<any> {
    return this.httpRequest.get(this.url, loader);
  }

  getAppById(appId, appVersion, loader?): Observable<any> {
    return this.httpRequest.get(this.url + "/by-id/" + appId + "/" + appVersion, loader);
  }

  deleteApp(appId, appVersion): Observable<any> {
    return this.httpRequest.delete(this.url + '/' + appId + "/" + appVersion);
  }

  submitApp(obj): Observable<any> {
    return this.httpRequest.post(this.url + '/publish', obj);
  }

  suspendApp(obj, loader?): Observable<any> {
    return this.httpRequest.post(this.url + '/suspend', obj, loader);
  }

  unsuspendApp(obj, loader?): Observable<any> {
    return this.httpRequest.post(this.url + '/unsuspend', obj, loader);
  }
}
