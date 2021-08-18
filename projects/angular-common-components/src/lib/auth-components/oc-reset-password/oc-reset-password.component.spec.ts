import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcResetPasswordComponent } from './oc-reset-password.component';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockHeadingTagDirective,
    MockLabelComponent,
    MockPasswordComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

describe('OcResetPasswordComponent', () => {
    let component: OcResetPasswordComponent;
    let fixture: ComponentFixture<OcResetPasswordComponent>;
    let router: Router;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcResetPasswordComponent,
                    MockLabelComponent,
                    MockPasswordComponent,
                    MockButtonComponent,
                    MockErrorComponent,
                    MockPasswordComponent,
                    MockRoutingComponent,
                    MockHeadingTagDirective,
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
        fixture = TestBed.createComponent(OcResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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

        expect(component.buttonClick.emit).toHaveBeenCalledWith(false);
    });

    it('should emit true value on form button click when form valid', async () => {
        component.process = false;
        component.resetModel.newPassword = 'QwErTy1#';
        spyOn(component.buttonClick, 'emit');
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
            button.click();
            expect(component.buttonClick.emit).toHaveBeenCalledWith(true);
        });
    });
});
