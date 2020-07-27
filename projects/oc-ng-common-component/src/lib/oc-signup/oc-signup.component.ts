import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SignUp } from 'oc-ng-common-service';

@Component({
  selector: 'oc-signup',
  templateUrl: './oc-signup.component.html',
  styleUrls: ['./oc-signup.component.scss']
})
export class OcSignupComponent implements OnInit {
  imagePath: any;

  @Input() signupModel = new SignUp();
  @Input() loginUrl;
  @Input() termsUrl;
  @Input() policyUrl;

  @Output() submit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  getValue(label: string) {
    return label;
  }

  // getImage() {
  //   return "~oc-ng-common-component/assets/img/logo-philips.svg";
  // }

  // img = {
  //   src: url('~oc-ng-common-component/assets/img/logo-philips.svg');
  // }

  submitForm(form) {
      if (!form.valid) {
        form.control.markAllAsTouched();
        return;
      }
      this.submit.emit(true);
   

  }

}
