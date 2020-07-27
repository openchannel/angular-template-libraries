import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
 selector: '[emailValidator]',
 providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {

 validate(c: FormControl): ValidationErrors {
    
   const isValidEmail = c.value ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,50}$/.test(c.value) : true; 
   const message = {
     'emailValidator': {
       'message': 'Email seems to be invalid'
     }
   };
   return isValidEmail ? null : message;
 }
}