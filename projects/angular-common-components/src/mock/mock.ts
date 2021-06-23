import { Component, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import {
    AbstractControl,
    AbstractControlDirective,
    ControlValueAccessor,
    FormArray,
    NG_VALUE_ACCESSOR,
    NgModel,
    FormControl,
    FormGroup,
} from '@angular/forms';
import { AppTypeFieldModel, FullAppData } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcCheckboxData, OcEditUserFormConfig, OCOrganization } from '@openchannel/angular-common-components/src/lib/auth-components';
import { FieldValueModel } from '@openchannel/angular-common-components/src/lib/form-components';

@Component({
    selector: 'oc-label',
    template: '',
})
export class MockLabelComponent {
    @Input() text: string = '';
}

@Component({
    selector: 'oc-input',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockInputComponent),
            multi: true,
        },
    ],
})
export class MockInputComponent implements ControlValueAccessor {
    @Input() inputType: string = 'text';
    @Input() placeholder: string = '';

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-error',
    template: '',
})
export class MockErrorComponent {
    @Input() control: AbstractControlDirective | AbstractControl | NgModel;
    @Input() field: string;
    @Input() modifyErrors: string;
}

@Component({
    selector: 'oc-button',
    template: '',
})
export class MockButtonComponent {
    @Input() text: string = '';
    @Input() disabled: boolean = false;
    @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
    @Input() class: string;
    @Input() customClass: string;
    @Input() style: string;
    @Input() process: string;
    @Input() customTemplate: TemplateRef<any>;
}

@Component({
    template: '',
})
export class MockRoutingComponent {}

@Component({
    selector: 'svg-icon',
    template: '',
})
export class MockSvgIconComponent {
    @Input() src: string;
}

@Component({
    selector: 'oc-password',
    template: '',
})
export class MockPasswordComponent {
    @Input() placeholder;
    /** Set `disable` state for input */
    @Input() disabled: boolean = false;
    /**
     *  Type of the input. Can be `text` or `email`
     *  @default 'text'
     */
    @Input() inputType: string = 'text';
}

@Component({
    selector: 'oc-checkbox',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockCheckboxComponent),
            multi: true,
        },
    ],
})
export class MockCheckboxComponent implements ControlValueAccessor {
    @Input() labelText: string;
    @Input() requiredIndicator: boolean = false;
    @Input() formControl: FormControl;
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    template: '',
    selector: 'oc-form',
})
export class MockFormComponent {
    @Input() formJsonData: any;
    @Input() generatedForm: FormGroup;
    @Input() successButtonText: string = 'Submit';
    @Input() showButton: boolean = true;
    @Output() formSubmitted = new EventEmitter<any>();
    @Output() cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    formData = {
        name: 'Test name',
        role: 'admin',
        aboutme: '',
        skills: ['angular'],
    };

    submitForm() {
        this.formSubmitted.emit(this.formData);
    }
}

@Component({
    selector: 'oc-rating',
    template: '',
})
export class MockRatingComponent {
    @Input() rating: number = 0;
    @Input() reviewCount: number = 0;
    @Input() label = '';
    @Input() labelClass = 'font-m font-med';
    @Input() type: 'single-star' | 'multi-star' = 'single-star';
}

@Component({
    selector: 'oc-app-card',
    template: '',
})
export class MockAppCardComponent {
    @Input() app: FullAppData;
    @Input() appRouterLink: any | string;
}

@Component({
    selector: 'oc-title',
    template: '',
})
export class MockTitleComponent {
    @Input() title: string;
    @Input() customStyle: any;
}

@Component({
    selector: 'oc-dynamic-field-array',
    template: ''
})
export class MockDynamicFieldArrayComponent {
    @Input() dfaFormArray: FormArray;
    @Input() fieldDefinitionData: AppTypeFieldModel;
}

@Component({
    selector: 'oc-select',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MockSelectComponent),
            multi: true,
        },
    ],
})
export class MockSelectComponent implements ControlValueAccessor {
    @Input() selectValArr: any | object[] = [];
    @Input() form: FormControl;
    registerOnChange(fn: any): void {}
    registerOnTouched(fn: any): void {}
    writeValue(obj: any): void {}
}

@Component({
    selector: 'oc-edit-user-form',
    template: '',
})
export class MockEditUserFormComponent {
    @Input() formConfigs: OcEditUserFormConfig[];
    @Input() defaultTypeLabelText: string;
    @Input() enableTypesDropdown = false;
    @Input() enablePasswordField = false;
    @Input() enableTermsCheckbox: OcCheckboxData;
    @Input() defaultAccountData: OCOrganization;
    @Input() defaultOrganizationData: OCOrganization;
    @Input() customTermsDescription: TemplateRef<any>;
}

@Component({
    selector: 'oc-tag-element',
    template: ''
})
export class MockTagComponent {
    @Input() title: string;
    @Input() closeMarker: boolean = false;
    @Input() deleteTagImgUrl: string = '~@openchannel/angular-common-components/assets/img/close-icon.svg';
    @Output() clickEmitter = new EventEmitter<string>();
}

@Component({
    selector: 'oc-dynamic-array-preview',
    template: ''
})
export class MockDynamicArrayPreview {
    @Input() fieldValues: FieldValueModel[];
    @Input() fieldDefinition: AppTypeFieldModel;
    @Input() dfaForm: FormGroup;
    @Input() hideLabel: boolean;
}
