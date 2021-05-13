import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSignupCustomComponent } from './oc-signup-custom.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
    MockButtonComponent,
    MockCheckboxComponent,
    MockEditUserFormComponent,
    MockErrorComponent,
    MockInputComponent,
    MockLabelComponent,
    MockPasswordComponent,
    MockRoutingComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('OcSignupCustomComponent', () => {
    let component: OcSignupCustomComponent;
    let fixture: ComponentFixture<OcSignupCustomComponent>;

    beforeEach(async(() => {
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSignupCustomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
