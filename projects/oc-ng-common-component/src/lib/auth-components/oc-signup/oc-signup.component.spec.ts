import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcSignupComponent} from './oc-signup.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule, Location} from '@angular/common';
import {BrowserModule, By} from '@angular/platform-browser';
import {
  MockButtonComponent,
  MockCheckboxComponent,
  MockErrorComponent,
  MockInputComponent,
  MockLabelComponent,
  MockPasswordComponent,
  MockRoutingComponent
} from 'oc-ng-common-component/src/mock/mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('OcSignupComponent', () => {
  let component: OcSignupComponent;
  let fixture: ComponentFixture<OcSignupComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcSignupComponent, MockLabelComponent, MockInputComponent, MockErrorComponent, MockButtonComponent,
        MockPasswordComponent, MockCheckboxComponent, MockRoutingComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule, RouterTestingModule.withRoutes([
        {path: 'login', component: MockRoutingComponent},
        {path: 'activation', component: MockRoutingComponent},
      ])]
    })
        .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to sign up page', async () => {
    component.loginUrl = '/login';
    fixture.detectChanges();

    const login: HTMLLinkElement = fixture.debugElement.query(By.css('.sign-up__login-link')).nativeElement;
    login.click();

    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/login');
    });
  });


  it('should emit true value on form button click when form valid', async () => {
    component.process = false;
    spyOn(component.submitClick, 'emit');

    component.signupModel = {
      uname: 'Test Test',
      company: 'Test',
      email: 'test@test.com',
      password: 'qWeRtY123#',
      isChecked: true
    };

    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
      button.click();
      expect(component.submitClick.emit).toHaveBeenCalledWith(true);
    });
  });

  it('button should not emmit submit when process is on', () => {
    component.process = true;
    spyOn(component.submitClick, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    expect(component.submitClick.emit).toHaveBeenCalledTimes(0);
  });

  it('should redirect to activation', () => {
    component.activationUrl = '/activation';
    fixture.detectChanges();
    component.goToActivationPage();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.url).toEqual('/activation');
    });
  });
});
