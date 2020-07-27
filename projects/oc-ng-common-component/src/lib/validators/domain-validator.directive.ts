import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[domainValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DomainValidatorDirective, multi: true }]
})
export class DomainValidatorDirective implements Validator {
 validate(c: FormControl): ValidationErrors {
   const isValidWebsite = c.value ?/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,50}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(c.value) : true;    
   const message = {
     'domainValidator': {
       'message': 'Please enter a valid domain'
     }
   };
   return isValidWebsite ? null : message;
 }
}