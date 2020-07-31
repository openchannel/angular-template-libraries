import { Injectable } from '@angular/core';
import { HttpRequestService } from 'oc-ng-common-service';
import { SellerSignup } from '../model/seller-signup';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private url = 'api/v1/seller';

  constructor(private httpRequest: HttpRequestService) { }

  signup(sellerSigupModel: SellerSignup) {
    return this.httpRequest.post(this.url + '/register', sellerSigupModel);
  }
  
}
