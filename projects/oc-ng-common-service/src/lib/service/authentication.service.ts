import { Injectable } from '@angular/core';
import { SellerSignin } from '../model/seller-signin';
import { SellerService } from './seller.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sellerService: SellerService,private router : Router) { }

  saveUserAfterLoginSuccess(res,signin:SellerSignin){
    localStorage.setItem("access_token",res.access_token);
    if(signin.isChecked){
      localStorage.setItem("rememberMe","true");
    }else {
      localStorage.setItem("rememberMe","false");
    }
   }

    /**
    * This method is responsible for save user profile information. 
    */
   saveUserprofileInformation(callBack){
    this.sellerService.getUserProfileDetails().subscribe(res => {
        if (res) {
          localStorage.setItem("email",res.email);
        }
        if(callBack){
          callBack();
        }
    });
 }

}
