import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[websiteValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: WebsiteValidatorDirective, multi: true }]
})
export class WebsiteValidatorDirective implements Validator {
 validate(c: FormControl): ValidationErrors {
   const isValidWebsite = c.value ?/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,50}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(c.value) : true;    
   const message = {
     'websiteValidator': {
       'message': 'Please enter a valid URL'
     }
   };
   return isValidWebsite ? null : message;
 }
}