import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OcFormComponent } from './oc-form.component';
import { Component, forwardRef, Input } from '@angular/core';
import { FileDetails } from 'oc-ng-common-service';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlValueAccessor,
  FormsModule, NG_VALUE_ACCESSOR,
  NgModel,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'oc-tooltip-label',
  template: ''
})
export class MockTooltipComponent {
  @Input() text: string = '';
  @Input() required: boolean = false;
  @Input() description: string = '';
  @Input() labelClass: string = '';
}

@Component({
  selector: 'oc-rich-text-editor',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockRichEditorComponent),
    multi: true
  }]
})
export class MockRichEditorComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-input',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockInputComponent),
    multi: true
  }],
})
export class MockInputComponent implements ControlValueAccessor {
  @Input() inputType: string = 'text';
  @Input() placeholder: string = '';
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-textarea',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockTextareaComponent),
    multi: true
  }],
})
export class MockTextareaComponent implements ControlValueAccessor {
  placeholderValue: string = '';

  @Input() set placeholder(placeholder: string) {
    if (placeholder) {
      this.placeholderValue = placeholder;
    }
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-select',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockSelectComponent),
    multi: true
  }],
})
export class MockSelectComponent implements ControlValueAccessor {
  @Input() selectValArr: any | object [] = [];
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-tags',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockTagsComponent),
    multi: true
  }],
})
export class MockTagsComponent implements ControlValueAccessor {
  @Input() placeHolderInputName: string = '';
  @Input() title: string;
  @Input() availableTags: string [] = [];
  @Input() minTagLength: number = 1;
  @Input() maxTagLength: number = null;
  @Input() minTagsCount: number;
  @Input() maxTagsCount: number = null;
  @Input() tagsType: 'string' | 'boolean' | 'number' = 'string';
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-file-upload',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockFileUploadComponent),
    multi: true
  }],
})
export class MockFileUploadComponent implements ControlValueAccessor {
  @Input() isMultiFile = false;
  @Input() defaultFileIcon = '';
  @Input() fileType: string;
  @Input() uploadIconUrl;
  @Input() mockUploadingFile: () => FileDetails;
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-number',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockNumberComponent),
    multi: true
  }],
})
export class MockNumberComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-checkbox',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockCheckboxComponent),
    multi: true
  }],
})
export class MockCheckboxComponent implements ControlValueAccessor {
  @Input() labelText: string;
  @Input() requiredIndicator: boolean = false;
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-color',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockColorComponent),
    multi: true
  }],
})
export class MockColorComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-video-url',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockVideoUrlComponent),
    multi: true
  }],
})
export class MockVideoUrlComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-datetime-picker',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockDateTimeComponent),
    multi: true
  }]
})
export class MockDateTimeComponent implements ControlValueAccessor {
  @Input()
  type: 'datetime' | 'date';
  @Input()
  settings: any;
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-multi-select-list',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockMultiSelectComponent),
    multi: true
  }]
})
export class MockMultiSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() set availableItemsList(value: any[]) {
    if (value && value.length > 0) {
      this.availableItems = value;
    } else {
      throw Error('availableItemsList is required!');
    }
  }
  public availableItems: string [] = [];
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}

@Component({
  selector: 'oc-dynamic-field-array',
  template: '',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockDynamicFieldArrayComponent),
    multi: true
  }]
})
export class MockDynamicFieldArrayComponent implements ControlValueAccessor {
  @Input() set fieldDefinitionData(value) {
    if (value) {
      this.fieldDefinition = value;
    } else {
      throw Error('FieldDefinitionData is required @Input() parameter');
    }
  }
  public fieldDefinition: any;
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  writeValue(obj: any): void {
  }
}
@Component({
  selector: 'oc-error',
  template: ''
})
export class MockErrorComponent {
  @Input()
  public control: AbstractControlDirective | AbstractControl | NgModel;
}
@Component({
  selector: 'oc-button',
  template: ''
})
export class MockButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() class: string;
  @Input() style: string;
}

describe('OcFormComponent', () => {
  let component: OcFormComponent;
  let fixture: ComponentFixture<OcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OcFormComponent,
        MockTooltipComponent,
        MockRichEditorComponent,
        MockTextareaComponent,
        MockSelectComponent,
        MockTagsComponent,
        MockFileUploadComponent,
        MockNumberComponent,
        MockCheckboxComponent,
        MockColorComponent,
        MockVideoUrlComponent,
        MockDateTimeComponent,
        MockMultiSelectComponent,
        MockDynamicFieldArrayComponent,
        MockErrorComponent,
        MockButtonComponent,
        MockInputComponent
      ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFormComponent);
    component = fixture.componentInstance;
    component.formJsonData = {
      formId: 'test',
        name: 'test',
        createdDate: 1599982592157,
        fields: [
        {
          id: 'name',
          label: 'name',
          description: 'test',
          defaultValue: null,
          type: 'text',
          required: null,
          attributes: {
            maxChars: 20,
            required: true,
            minChars: 10
          },
          options: null,
          subFieldDefinitions: null
        },
        {
          id: 'role',
          label: 'role',
          description: '',
          defaultValue: 'user',
          type: 'dropdownList',
          required: null,
          attributes: {required: true},
          options: ['admin', 'user', 'test'],
          subFieldDefinitions: null
        },
        {
          id: 'aboutme',
          label: 'About Me',
          description: '',
          defaultValue: null,
          type: 'richText',
          required: null,
          attributes: {
            maxChars: 150,
            required: null,
            minChars: 10
          },
          options: null,
          subFieldDefinitions: null
        },
        {
          id: 'skills',
          label: 'skills',
          description: 'skills',
          defaultValue: ['angular'],
          type: 'tags',
          required: null,
          attributes: {
            minCount: 1,
            maxCount: 5,
            required: true
          }, options: null,
          subFieldDefinitions: null
        }]
    };
  });

  it('should create', () => {
    spyOn(component.createdForm, 'emit');
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.createdForm.emit).toHaveBeenCalledTimes(1);
  });

  it('should hide buttons', () => {
    component.showButton = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button'));

    expect(button).toBeNull();
  });
});
