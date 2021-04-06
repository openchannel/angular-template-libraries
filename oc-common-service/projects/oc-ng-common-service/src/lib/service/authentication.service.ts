import { Injectable } from '@angular/core';
import { SellerSignin } from '../model/seller-signin';
import { SellerService } from './seller.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sellerService: SellerService) { }

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

   saveUserprofileInformation(successCallback?,errorCallback?){

    this.sellerService.getUserProfileDetails().subscribe(res => {
        if (res) {
          localStorage.setItem("email",res.email);
        }
        if(successCallback){
          successCallback();
        }            
    },
    res => {
      if(errorCallback){
        errorCallback();        
      }
    });
  }

  isLoggedInUser(){
    if(localStorage.getItem("access_token")){
      return true;
    }
    return false;
  }  

}
