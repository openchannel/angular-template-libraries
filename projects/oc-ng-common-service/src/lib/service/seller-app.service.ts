import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { SellerAppDetailsModel } from '../model/seller-app-details-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerAppService {
  
  private url = 'api/v1/apps';

  constructor(private httpRequest: HttpRequestService) { }

  saveApplication(appDetails: SellerAppDetailsModel){
    return this.httpRequest.post(this.url, appDetails);
  }

  submitApplication(appDetails: SellerAppDetailsModel){
    return this.httpRequest.post(this.url+"/submit", appDetails);
  }

  getApps(): Observable<any> {
    return this.httpRequest.get(this.url, 'true');
  }

  getAppById(appId,loader?): Observable<any>{
    return this.httpRequest.get(this.url+"/by-id/"+appId,loader);
  }
}
