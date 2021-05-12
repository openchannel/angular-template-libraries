import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcResendActivationComponent } from './oc-resend-activation.component';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

describe('OcResendActivationComponent', () => {
    let component: OcResendActivationComponent;
    let fixture: ComponentFixture<OcResendActivationComponent>;
    let router: Router;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcResendActivationComponent,
                    MockButtonComponent,
                    MockLabelComponent,
                    MockInputComponent,
                    MockErrorComponent,
                    MockRoutingComponent,
                ],
                providers: [NgModel],
                imports: [
                    FormsModule,
                    CommonModule,
                    BrowserModule,
                    RouterTestingModule.withRoutes([{ path: 'signup', component: MockRoutingComponent }]),
                ],
            }).compileComponents();
            router = TestBed.inject(Router);
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcResendActivationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit false value on form button click', () => {
        component.process = false;
        spyOn(component.submit, 'emit');

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
        button.click();

        expect(component.submit.emit).toHaveBeenCalledWith(false);
    });

    it('button should not emmit submit when process is on', () => {
        component.process = true;
        spyOn(component.submit, 'emit');

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
        button.click();

        expect(component.submit.emit).toHaveBeenCalledTimes(0);
    });

    it('should emit true value on form button click', async () => {
        component.process = false;
        component.activationModel.email = 'test@test.com';
        spyOn(component.submit, 'emit');
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
            button.click();
            expect(component.submit.emit).toHaveBeenCalledWith(true);
        });
    });
});
