import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcSignupCustomComponent } from './oc-signup-custom.component';
import { FormControl, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import {
    MockButtonComponent,
    MockCheckboxComponent,
    MockEditUserFormComponent,
    MockErrorComponent,
    MockHeadingTagDirective,
    MockInputComponent,
    MockLabelComponent,
    MockPasswordComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

const formConfigsMock = [
    {
        name: 'My custom 123321',
        account: {
            type: 'check-config-type',
            typeData: null,
            includeFields: ['name', 'username', 'email'],
        },
    },
];

describe('OcSignupCustomComponent', () => {
    let component: OcSignupCustomComponent;
    let fixture: ComponentFixture<OcSignupCustomComponent>;
    let location: Location;
    let router: Router;

    const testUrl = 'https://some-site.com/test-img-123';

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcSignupCustomComponent,
                    MockEditUserFormComponent,
                    MockPasswordComponent,
                    MockLabelComponent,
                    MockInputComponent,
                    MockErrorComponent,
                    MockButtonComponent,
                    MockCheckboxComponent,
                    MockRoutingComponent,
                    MockHeadingTagDirective,
                ],
                imports: [
                    FormsModule,
                    CommonModule,
                    BrowserModule,
                    RouterTestingModule.withRoutes([
                        { path: 'login', component: MockRoutingComponent },
                        { path: 'activation', component: MockRoutingComponent },
                    ]),
                ],
                providers: [NgModel],
            }).compileComponents();
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSignupCustomComponent);
        component = fixture.componentInstance;
        component.formConfigs = cloneDeep(formConfigsMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to sign up page', () => {
        component.loginUrl = '/login';
        fixture.detectChanges();

        const login: HTMLLinkElement = fixture.debugElement.query(By.css('.sign-up__login-link')).nativeElement;
        login.click();

        expect(location.path()).toEqual('/login');
    });

    it('submit button should not emmit submit when process is on', () => {
        component.process = true;
        const resultUserDataEmitFunction = jest.spyOn(component.resultUserData, 'emit');

        component.formConfigsLoading = false;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.sign-up__button')).nativeElement;
        button.click();

        expect(resultUserDataEmitFunction).not.toHaveBeenCalled();
    });

    it('should redirect to activation', () => {
        component.showSignupFeedbackPage = true;
        component.activationUrl = '/activation';
        fixture.detectChanges();

        component.goToActivationPage();

        fixture.whenStable().then(() => {
            expect(router.url).toEqual('/activation');
        });
    });

    it('should emit show sign up feedback page change, when sign up link clicked', () => {
        const showSignupFeedbackPageChangeEmitFunction = jest.spyOn(component.showSignupFeedbackPageChange, 'emit');
        component.showSignupFeedbackPage = true;
        fixture.detectChanges();

        const signUpLink: HTMLLinkElement = fixture.debugElement.query(By.css('.result__link')).nativeElement;
        signUpLink.click();

        expect(showSignupFeedbackPageChangeEmitFunction).toHaveBeenCalled();
    });

    it('should not show sign up button, when form configs loading', () => {
        const resultFormValue = {
            account: {
                name: 'Name',
                email: 'email@test.com',
            },
            password: 'qwerty',
        };

        const resultUserDataEmitFunction = jest.spyOn(component.resultUserData, 'emit');

        component.formConfigsLoading = false;
        component.resultFormValue = resultFormValue;
        fixture.detectChanges();

        const signUpButton = fixture.debugElement.query(By.css('.sign-up__button')).nativeElement;
        signUpButton.click();

        expect(resultUserDataEmitFunction).toHaveBeenCalledWith(resultFormValue);
    });

    it('should not show sign up button, when no form configs available', () => {
        component.formConfigs = [];
        fixture.detectChanges();

        const signUpButton = fixture.debugElement.query(By.css('.sign-up__button'));

        expect(signUpButton).toBeNull();
    });

    it('should touch all form fields on submit', () => {
        component.formConfigsLoading = false;
        component.formGroup = new FormGroup({
            email: new FormControl('email'),
            password: new FormControl('password'),
        });
        fixture.detectChanges();

        const signUpButton = fixture.debugElement.query(By.css('.sign-up__button')).nativeElement;
        signUpButton.click();

        expect(component.formGroup.touched).toBeTruthy();
    });

    it('should pass correct src to company logo', () => {
        const companyLogoImages: HTMLImageElement[] = [];

        component.companyLogoUrl = testUrl;
        component.showSignupFeedbackPage = false;
        fixture.detectChanges();

        companyLogoImages.push(fixture.debugElement.query(By.css('.company-logo')).nativeElement);

        component.showSignupFeedbackPage = true;
        fixture.detectChanges();

        companyLogoImages.push(fixture.debugElement.query(By.css('.company-logo')).nativeElement);

        companyLogoImages.forEach(companyLogoImage => expect(companyLogoImage.src).toBe(testUrl));
    });

    it('should pass correct src to forgot password image', () => {
        component.forgotPasswordDoneUrl = testUrl;
        component.showSignupFeedbackPage = true;
        fixture.detectChanges();

        const forgotPasswordImage: HTMLImageElement = fixture.debugElement.query(By.css('.result__message-img')).nativeElement;

        expect(forgotPasswordImage.src).toBe(testUrl);
    });

    it('should set correct heading tag', () => {
        const testHeadingTag = 'h6';

        component.headingTag = testHeadingTag;
        component.showSignupFeedbackPage = false;
        fixture.detectChanges();

        const heading = fixture.debugElement.query(By.css('.sign-up__header-heading')).componentInstance;

        expect(heading.headingTag).toBe(testHeadingTag);
    });
});
