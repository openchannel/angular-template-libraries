import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractControlDirective, AbstractControl, NgModel } from '@angular/forms';
import { OcErrorService } from './oc-error-service';

@Component({
  selector: 'oc-error',
  templateUrl: './oc-error.component.html',
  styleUrls: ['./oc-error.component.scss']
})
export class OcErrorComponent implements OnInit {

  constructor(public errorService: OcErrorService) { }

  ngOnInit(): void {
  }

  private static readonly errorMessages = {
    'required': () => 'Please fill out this field',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.errorMessages,
    'emailValidator': () => 'Email seems to be invalid',
    'websiteValidator': () => 'Please enter a valid URL',
    'appImageFileValidator': () => 'Please provide valid png/jpg/jpeg/gif image file',
    'appExpiredDateValidator': () => 'Please fill valid current or future date',
    'whiteSpaceValidator': () => 'Please fill valid value',
    'domainValidator': () => 'Please enter a valid domain',
    'phoneNumberValidator': (params) => params.message,
    'confirmPassword': () => 'Confirm password does not match to new password',
    'serverErrorValidator': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl | NgModel;

  // server error field name
  @Input() 
  private field: String;

  shouldShowErrors(): boolean {

    //client side error validators check
    if(this.control && this.control.errors && (this.control.dirty || this.control.touched)){
      return true;
    }
    
    //server side error validators check
    if (this.errorService.serverErrorList && this.errorService.serverErrorList.length && typeof this.errorService.serverErrorList == 'object') {
      const error = this.errorService.serverErrorList.find(message => message.field === this.field)        
      if(error){
        setTimeout(() => {
            // clear error from service as we have fetched it
            this.errorService.clearError(error);
            // create error validation object an pass it to control
            const errors = { 'serverErrorValidator': error };
            (this.control as NgModel).control.setErrors(errors);
        });              
        return true;             
      }        
    }
    // no error
    return false;
  }

  listOfErrors(): string[] {
    if(!this.control.errors){
      return [];
    }
    
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return OcErrorComponent.errorMessages[type](params);
  }

}
