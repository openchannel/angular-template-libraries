import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcLoginComponent } from './oc-login.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MockButtonComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockPasswordComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';

describe('OcLoginComponent', () => {
    let component: OcLoginComponent;
    let fixture: ComponentFixture<OcLoginComponent>;
    let router: Router;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcLoginComponent,
                    MockLabelComponent,
                    MockInputComponent,
                    MockErrorComponent,
                    MockButtonComponent,
                    MockRoutingComponent,
                    MockPasswordComponent,
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
        fixture = TestBed.createComponent(OcLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
