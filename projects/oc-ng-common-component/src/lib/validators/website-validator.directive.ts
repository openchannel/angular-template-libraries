import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[websiteValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WebsiteValidatorDirective, multi: true }]
})
export class WebsiteValidatorDirective implements Validator {
 validate(c: FormControl): ValidationErrors {
   const isValidWebsite = this.validateInputWithPattern(c.value);
   const message = {
     'websiteValidator': {
       'message': 'Please enter a valid URL'
     }
   };
   return isValidWebsite ? null : message;
 }

 validateInputWithPattern(urlString:string) : boolean {
    if(urlString === null || typeof urlString === 'undefined' || urlString.trim().length === 0){
      return true;
    }
    if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#\$&'\*\+,;=.]+$/.test(urlString)){
      return false;
    } 
    if(urlString.startsWith("http://.") || urlString.startsWith("https://.")){
      return false;
    }
    if(urlString.startsWith(".") || urlString.endsWith(".")){
      return false;
    }else{
      for(let i = 0; i<urlString.length;i++){
        if(urlString[i] === "." && urlString[++i] === "."){
          return false;
        }
      }
    }
    return true;
 }
}