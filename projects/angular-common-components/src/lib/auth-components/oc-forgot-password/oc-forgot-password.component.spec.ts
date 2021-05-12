import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcForgotPasswordComponent } from './oc-forgot-password.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockRoutingComponent,
    MockSvgIconComponent,
} from '@openchannel/angular-common-components/src/mock/mock';

describe('OcForgotPasswordComponent', () => {
    let component: OcForgotPasswordComponent;
    let fixture: ComponentFixture<OcForgotPasswordComponent>;
    let router: Router;
    let location: Location;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcForgotPasswordComponent,
                    MockLabelComponent,
                    MockInputComponent,
                    MockErrorComponent,
                    MockButtonComponent,
                    MockSvgIconComponent,
                    MockRoutingComponent,
                ],
                providers: [NgModel],
                imports: [
                    FormsModule,
                    CommonModule,
                    BrowserModule,
                    RouterTestingModule.withRoutes([
                        { path: 'resend-activation', component: MockRoutingComponent },
                        { path: 'signup', component: MockRoutingComponent },
                        { path: 'login', component: MockRoutingComponent },
                    ]),
                ],
            }).compileComponents();
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcForgotPasswordComponent);
        component = fixture.componentInstance;
        component.loginUrl = 'login';
        component.signupUrl = 'signup';
        fixture.detectChanges();
    });

    it('should create', () => {
        component.loginUrl = 'login';
        component.signupUrl = 'signup';
        expect(component).toBeTruthy();
    });

    it('should redirect to login up page', async () => {
        component.loginUrl = '/login';
        fixture.detectChanges();
        const login: HTMLLinkElement = fixture.debugElement.query(By.css('.forgot-password__log-in .forgot-password__link')).nativeElement;
        login.click();

        await fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/login');
        });
    });

    it('should emit true value on form button click when form valid', async () => {
        component.process = false;
        component.loginModel.email = 'test@test.com';
        spyOn(component.submit, 'emit');
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
            button.click();
            expect(component.submit.emit).toHaveBeenCalledWith(true);
        });
    });

    it('button should not emmit submit when form not valid', async () => {
        component.process = false;
        component.loginModel.email = '';
        spyOn(component.submit, 'emit');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
            button.click();
            expect(component.submit.emit).toHaveBeenCalledTimes(0);
        });
    });

    it('button should not emmit submit when process is on', () => {
        component.process = true;
        spyOn(component.submit, 'emit');

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
        button.click();

        expect(component.submit.emit).toHaveBeenCalledTimes(0);
    });

    it('should redirect to login page', async () => {
        fixture.detectChanges();
        component.goBackToLogin();
        fixture.detectChanges();
        await fixture.whenStable().then(() => {
            expect(router.url).toBe('/login');
        });
    });
});
