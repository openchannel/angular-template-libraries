import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';


@Directive({
  selector: '[ocPasswordValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validator {
  readonly regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%!^&]).{8,}$/;

  readonly message = {
    passwordValidator: {
      message: 'Password must contains 1 uppercase, 1 lowercase, 1 digit, 1 special char (one of @#$%!^&) and at least 8 character long'
    }
  };

  validate(c: FormControl): ValidationErrors {
    const password = c.value ? c.value : '';
    return password.match(this.regex) ? null: this.message;
  }
}
