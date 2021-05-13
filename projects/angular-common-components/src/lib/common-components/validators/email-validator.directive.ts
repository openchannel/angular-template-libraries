import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';


@Directive({
  selector: '[ocEmailValidator]',
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
