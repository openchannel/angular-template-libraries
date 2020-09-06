import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[phoneNumberValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneNumberValidatorDirective, multi: true}]
})
export class PhoneNumberValidatorDirective implements Validator {

  validate(ctrl: FormControl): ValidationErrors {
    const isValidNumber = ctrl.value ? /^[0-9]*$/.test(ctrl.value) : true;
    const message = {
      'phoneNumberValidator': {
        'message': 'Phone Number seems to be invalid'
      }
    };
    return isValidNumber ? null : message;
  }

}
