import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SellerSignup} from 'oc-ng-common-service';
import {Router} from '@angular/router';
import {OcSellerAgreementComponent} from '../../public-api';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from '../oc-popup/dialog.service';

@Component({
  selector: 'oc-signup',
  templateUrl: './oc-signup.component.html',
  styleUrls: ['./oc-signup.component.scss']
})
export class OcSignupComponent implements OnInit {
  imagePath: any;
  closeResult = '';

  @Input() signupModel = new SellerSignup();
  @Input() loginUrl;
  @Input() activationUrl;
  @Input() signupUrl;
  @Input() termsUrl;
  @Input() policyUrl;
  @Input() companyLogoUrl;
  @Input() process;
  @Input() forgotPasswordDoneUrl;
  @Input() showSignupFeedbackPage;
  @Input() title: string;
  @Input() text: string;
  @Input() textVariable: string;
  @Input() cancelButtonText: string;
  @Input() confirmButtonText: string;
  @Input() closeButtonText: string;

  @Output() submit = new EventEmitter<any>();


  constructor(public dialog: NgbModal,
              private dialogService: DialogService,
              private router: Router) {
  }


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
      this.submit.emit(false);
      return false;
    }
    this.submit.emit(true);
    return false;
  }

  goToActivationPage() {
    this.router.navigateByUrl(this.activationUrl);
  }

  openSellerAgreementDetails() {
    this.dialogService.showAgreementPopup(OcSellerAgreementComponent as Component,
      'Seller Agreement',
      // tslint:disable: max-line-length
      `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
      Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
      dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
      Nam eget dui. Etiam rhoncus.`, 'Close');
  }
}
