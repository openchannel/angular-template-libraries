import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcSignupCustomComponent } from './oc-signup-custom.component';
import { FormsModule, NgModel } from '@angular/forms';
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

describe('OcSignupCustomComponent', () => {
    let component: OcSignupCustomComponent;
    let fixture: ComponentFixture<OcSignupCustomComponent>;
    let location: Location;
    let router: Router;

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
                providers: [NgModel],
                imports: [
                    FormsModule,
                    CommonModule,
                    BrowserModule,
                    RouterTestingModule.withRoutes([
                        { path: 'login', component: MockRoutingComponent },
                        { path: 'activation', component: MockRoutingComponent },
                    ]),
                ],
            }).compileComponents();
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSignupCustomComponent);
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

    it('button should not emmit submit when process is on', () => {
        component.process = true;
        spyOn(component.resultUserData, 'emit');

        component.formConfigsLoading = false;
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('.sign-up__button')).nativeElement;
        button.click();

        expect(component.resultUserData.emit).toHaveBeenCalledTimes(0);
    });

    it('should redirect to activation', () => {
        component.showSignupFeedbackPage = true;
        component.activationUrl = '/activation';
        fixture.detectChanges();
        component.goToActivationPage();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(router.url).toEqual('/activation');
        });
    });
});
