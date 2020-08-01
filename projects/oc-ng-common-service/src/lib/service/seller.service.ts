import { Injectable } from '@angular/core';
import { SellerSignup } from '../model/seller-signup';
import { HttpRequestService } from './http-request-services';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private url = 'api/v1/seller';

  constructor(private httpRequest: HttpRequestService) { }

  signup(sellerSigupModel: any) {
    return this.httpRequest.post(this.url + '/register', sellerSigupModel);
  }
  
}
