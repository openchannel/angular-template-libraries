import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, AbstractControlDirective, NgModel} from '@angular/forms';
import {OcErrorService} from './oc-error-service';

@Component({
  selector: 'oc-error',
  templateUrl: './oc-error.component.html',
  styleUrls: ['./oc-error.component.scss']
})
export class OcErrorComponent implements OnInit {

  private readonly errorMessages = {
    required: () => 'Please fill out this field',
    minlength: (params) => 'The min number of characters is ' + params.requiredLength,
    maxlength: (params) => 'The max allowed number of characters is ' + params.requiredLength,
    minCount: () => '',
    maxCount: () => '',
    minElementsCount: (params) => 'The min elements count is ' + params.requiredCount,
    maxElementsCount: (params) => 'The max elements count is ' + params.requiredCount,
    pattern: (params) => 'The required pattern is: ' + params.requiredPattern,
    years: (params) => params.message,
    countryCity: (params) => params.message,
    uniqueName: (params) => params.message,
    telephoneNumbers: (params) => params.message,
    telephoneNumber: (params) => params.errorMessages,
    emailValidator: () => 'Email seems to be invalid',
    email: () => 'Email seems to be invalid',
    websiteValidator: () => 'Please enter a valid URL',
    appImageFileValidator: () => 'Please provide valid png/jpg/jpeg/gif image file',
    appExpiredDateValidator: () => 'Please fill valid current or future date',
    whiteSpaceValidator: () => 'Please fill valid value',
    domainValidator: () => 'Please enter a valid domain',
    phoneNumberValidator: (params) => params.message,
    confirmPassword: () => 'Confirm password does not match to new password',
    serverErrorValidator: (params) => params.message,
    min: (params) => 'The minimum possible value is ' + params.min,
    max: (params) => 'The maximum possible value is ' + params.max,
    colorValidator: () => 'Please enter a valid Color value.',
    booleanTagsValidator: (params) => params.fieldTitle + ' can only contain boolean values (\'true\' or \'false\')',
    numberTagsValidator: (params) => params.fieldTitle + ' can only contain numeric values'
  };

  @Input()
  public control: AbstractControlDirective | AbstractControl | NgModel;
  // server error field name
  @Input()
  public field: string;
  @Input()
  public errorParams: any;

  constructor(public errorService: OcErrorService) {
  }

  ngOnInit(): void {
  }

  shouldShowErrors(): boolean {

    // client side error validators check
    if (this.control && this.control.errors && (this.control.dirty || this.control.touched)) {
      return true;
    }
    // server side error validators check
    if (this.errorService.serverErrorList && this.errorService.serverErrorList.length
      && typeof this.errorService.serverErrorList === 'object') {
      const error = this.errorService.serverErrorList.find(message => message.field === this.field);
      if (error) {
        setTimeout(() => {
          // clear error from service as we have fetched it
          this.errorService.clearError(error);
          // create error validation object an pass it to control
          const errors = { serverErrorValidator: error};
          (this.control as NgModel).control.setErrors(errors);
          (this.control as NgModel).control.markAsTouched();
        });
        return true;
      }
    }
    // no error
    return false;
  }

  listOfErrors(): string[] {
    if (this.control) {
      if (!this.control.errors) {
        return [];
      }
      return Object.keys(this.control.errors)
          .map(field => this.getMessage(field, this.control.errors[field]));
    } else if (this.field) {
      return [this.getMessage(this.field, this.errorParams)];
    }
    return [];
  }

  private getMessage(type: string, params: any) {
    return this.errorMessages[type](params);
  }

}
