import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcEditUserFormComponent } from './oc-edit-user-form.component';
import {
    MockCheckboxComponent,
    MockErrorComponent,
    MockFormComponent,
    MockPasswordComponent,
    MockSelectComponent,
    MockTooltipComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { FormControlDirective, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { OcFormGenerator } from '@openchannel/angular-common-components/src/lib/form-components';
import { OcEditUserFormConfig } from '../models/oc-edit-user-form.model';

const firstForm: OcEditUserFormConfig = {
    name: 'First Form',
    account: {
        includeFields: ['name', 'email'],
        typeData: {
            fields: [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Name',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'email',
                    type: 'text',
                    label: 'Email',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'about-me',
                    type: 'text',
                    attributes: {
                        required: true,
                    },
                    label: 'About me',
                },
            ],
        },
        type: 'first-account-form',
    },
    organization: {
        includeFields: ['customData.organization'],
        typeData: {
            fields: [
                {
                    id: 'customData.company',
                    type: 'text',
                    label: 'Company',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'customData.country',
                    type: 'text',
                    label: 'Country',
                    attributes: {
                        required: true,
                    },
                },
            ],
        },
        type: 'first-organization-form',
    },
    fieldsOrder: ['email', 'name'],
};

const secondForm: OcEditUserFormConfig = {
    name: 'Second Form',
    account: {
        includeFields: ['name', 'email', 'about-me'],
        typeData: {
            fields: [
                {
                    id: 'name',
                    type: 'text',
                    label: 'Name',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'email',
                    type: 'text',
                    label: 'Email',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'about-me',
                    type: 'text',
                    attributes: {
                        required: true,
                    },
                    label: 'About me',
                },
            ],
        },
        type: 'second-account-form',
    },
    organization: {
        includeFields: ['customData.organization', 'customData.country'],
        typeData: {
            fields: [
                {
                    id: 'customData.company',
                    type: 'text',
                    label: 'Company',
                    attributes: {
                        required: true,
                    },
                },
                {
                    id: 'customData.country',
                    type: 'text',
                    label: 'Country',
                    attributes: {
                        required: true,
                    },
                },
            ],
        },
        type: 'second-organization-form',
    },
};

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
        component.formConfigs = [firstForm, secondForm];
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should change form type', () => {
        component.enableTypesDropdown = true;
        fixture.detectChanges();
        component.buildFormByConfig(secondForm);
        fixture.detectChanges();
        expect(component.currentFormConfig).toEqual(secondForm);
    });

    it('should show terms checkbox', () => {
        component.enableTermsCheckbox = {
            termsUrl: 'http://terms',
            policyUrl: 'http://policy',
        };
        component.setFormGroup(OcFormGenerator.getFormByConfig(firstForm.account.typeData.fields) as FormGroup);
        console.log(component.termsControl);
        fixture.detectChanges();

        console.log(fixture.debugElement.query(By.css('.edit-user-form__consent')));
        const checkbox = fixture.debugElement.query(By.css('.edit-user-form__consent-checkbox'));
        const termsText = fixture.debugElement.query(By.css('.edit-user-form__consent__label'));

        expect(checkbox).toBeTruthy();
        expect(termsText).toBeTruthy();
    });
});
