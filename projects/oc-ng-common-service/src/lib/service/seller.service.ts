import { Injectable } from '@angular/core';
import { SellerSignup } from '../model/seller-signup';
import { HttpRequestService } from './http-request-services';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private url = 'api/v1/seller';

  constructor(private httpRequest: HttpRequestService) { }

  /**
   * This service is responsible for seller signup feature.
   * @param sellerSigupModel 
   */
  signup(sellerSigupModel: any) {
    return this.httpRequest.post(this.url + '/register', sellerSigupModel);
  }

  /**
   * This service is responsible for seller password reset feature.
   * @param email 
   */
  resetForgotPassword(email:string){
    return this.httpRequest.post(this.url + '/password-reset-link/' + email, null);
  }  
}
