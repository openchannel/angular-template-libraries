import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { SellerAppDetailsModel } from '../model/seller-app-details-model';

@Injectable({
  providedIn: 'root'
})
export class SellerAppService {
  
  private appBaseUrl = 'api/v1/apps';

  constructor(private httpRequest: HttpRequestService) { }

  saveApplication(appDetails: SellerAppDetailsModel){
    return this.httpRequest.post(this.appBaseUrl, appDetails);
  }

  submitApplication(appDetails: SellerAppDetailsModel){
    return this.httpRequest.post(this.appBaseUrl+"/submit", appDetails);
  }
}
