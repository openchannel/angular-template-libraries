import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcEditUserFormComponent } from './oc-edit-user-form.component';
import {
    MockCheckboxComponent,
    MockErrorComponent,
    MockFormComponent,
    MockPasswordComponent,
    MockSelectComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MockTooltipComponent } from '@openchannel/angular-common-components/src/lib/form-components/oc-form/oc-form.component.spec';

describe('OcEditUserFormComponent', () => {
    let component: OcEditUserFormComponent;
    let fixture: ComponentFixture<OcEditUserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                OcEditUserFormComponent,
                MockErrorComponent,
                MockPasswordComponent,
                MockCheckboxComponent,
                MockFormComponent,
                MockSelectComponent,
                MockTooltipComponent,
            ],
            providers: [NgModel],
            imports: [FormsModule, CommonModule, ReactiveFormsModule, BrowserModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcEditUserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
