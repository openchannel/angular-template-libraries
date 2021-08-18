import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcActivationComponent } from './oc-activation.component';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockHeadingTagDirective,
    MockInputComponent,
    MockLabelComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';

describe('OcActivationComponent', () => {
    let component: OcActivationComponent;
    let fixture: ComponentFixture<OcActivationComponent>;
    let location: Location;
    let router: Router;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcActivationComponent,
                    MockLabelComponent,
                    MockErrorComponent,
                    MockButtonComponent,
                    MockInputComponent,
                    MockRoutingComponent,
                    MockHeadingTagDirective,
                ],
                imports: [
                    FormsModule,
                    RouterTestingModule.withRoutes([
                        { path: 'resend-activation', component: MockRoutingComponent },
                        { path: 'signup', component: MockRoutingComponent },
                    ]),
                ],
            }).compileComponents();

            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcActivationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to resend activation url', async () => {
        component.resendActivationUrl = 'resend-activation';
        fixture.detectChanges();

        const reactivation: HTMLLinkElement = fixture.debugElement.query(By.css('#reactivation')).nativeElement;
        reactivation.click();

        await fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/resend-activation');
        });
    });

    it('should redirect to sign up page', async () => {
        component.signupUrl = 'signup';
        fixture.detectChanges();

        const signup: HTMLLinkElement = fixture.debugElement.query(By.css('#signup')).nativeElement;
        signup.click();

        await fixture.whenStable().then(() => {
            expect(location.path()).toEqual('/signup');
        });
    });

    it('should emit false value on form button click', () => {
        component.process = false;
        spyOn(component.buttonClick, 'emit');

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
        button.click();

        expect(component.buttonClick.emit).toHaveBeenCalledWith(false);
    });

    it('button should not emmit submit when process is on', () => {
        component.process = true;
        spyOn(component.buttonClick, 'emit');

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
        button.click();

        expect(component.buttonClick.emit).toHaveBeenCalledTimes(0);
    });
});
