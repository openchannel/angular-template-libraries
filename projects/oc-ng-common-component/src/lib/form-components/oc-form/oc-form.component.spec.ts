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
  @Input()
  public field: string;
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
        attributes: {
          minCount: 1,
          maxCount: 5,
          required: true
        }, options: null,
        subFieldDefinitions: null
      },
      {
        attributes:	{
          max:	25,
          min:	5,
          required:	null,
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	'',
        id:	'test-number',
        label:	'Test number',
        placeholder:	null,
        type:	'number'
      },
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	true,
        description:	'',
        id:	'test-checkbox',
        label:	'Test Checkbox',
        placeholder:	null,
        type:	'checkbox'
      },
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	'',
        id:	'test-email',
        label:	'Test email',
        placeholder:	'enter email',
        type:	'emailAddress'
      },
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-url-component',
        label:	'Test URL component',
        placeholder:	'Enter your link here..',
        type:	'websiteUrl'
      },
      {
        attributes:	{
          required:	true
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-color-component',
        label:	'Test Color Component',
        placeholder:	'Choose your color',
        type:	'color'
      },
      {
        attributes:	{
          required:	true,
          maxCount:	null,
          minCount:	null
        },
        options: ['true', 'false'],
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-boolean-tags',
        label:	'Test Boolean tags',
        placeholder:	null,
        type:	'booleanTags'
      },
      {
        attributes:	{
          required:	true,
          maxCount:	2,
          minCount:	1
        },
        options: ['1', '3', '45'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'test-number-tags',
        label:	'Test number tags',
        placeholder:	null,
        type:	'numberTags'
      },
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	null,
        description:	null,
        id:	'test-date-picker',
        label:	'Test Date picker',
        placeholder:	null,
        type:	'date'
      },
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	1602489693553,
        description:	null,
        id:	'test-datetime-picker',
        label:	'Test date-time picker',
        placeholder:	null,
        type:	'datetime'
      },
      {
        attributes:	{
          required:	true,
        },
        category:	'CUSTOM',
        defaultValue:	'https://www.youtube.com/watch?v=DGQwd1_dpuc',
        description:	null,
        id:	'test-video-url-comp',
        label:	'Test videoUrl component',
        placeholder:	null,
        type:	'videoUrl'
      },
      {
        attributes:	{
          required:	true,
          maxCount:	3,
          minCount:	2
        },
        options: ['One', 'Two', 'Three', 'Five'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'multi-select-test',
        label:	'Multi Select test',
        placeholder:	null,
        type:	'multiselectList'
      },
      {
        attributes:	{
          required:	true,
          maxCount:	1,
          minCount:	null
        },
        options: ['One', 'Two', 'Three', 'Five'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'multi-select-test2',
        label:	'Multi Select test',
        placeholder:	null,
        type:	'multiselectList'
      },
      {
        attributes: {
          maxCount: 3,
          minCount: 1,
          ordering: 'append',
          required:	true,
          rowLabel:	'field1'
        },
        category: 'CUSTOM',
        defaultValue: null,
        description: '',
        id: 'test-dynamic-field-array',
        label: 'Test Dynamic field array',
        placeholder: null,
        fields: [
          {
            attributes: {
              maxChars: null,
              minChars: null,
              required: null
            },
            category: 'CUSTOM',
            defaultValue: null,
            description: 'some description',
            id: 'field1',
            label: 'field1',
            placeholder: 'write some text',
            type: 'text'
          },
          {
            id:	'long-text-example',
            label: 'Long Text Example',
            type:	'longText',
            placeholder: 'Write your text here...',
            category: 'CUSTOM',
            defaultValue: null,
            attributes: {
              maxChars:	200,
              required:	null,
              minChars:	2
            },
          }
        ],
        type: 'dynamicFieldArray'
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

  it('should show text on button', () => {
    component.successButtonText = 'Text Button';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('oc-button')).componentInstance;

    expect(button.text).toEqual('Text Button');
  });

  it('should set form dirty', () => {
    component.setFormDirty = true;

    fixture.detectChanges();

    const testControl = (Object as any).values(component.customForm.controls)[0];

    expect(testControl.touched).toEqual(true);
    expect(component.customForm.dirty).toEqual(true);
  });

  it('should show count validation errors', () => {
    component.formJsonData.fields.push(
      {
        attributes:	{
          required:	true,
          maxCount:	3,
          minCount:	2
        },
        options: ['1', '3', '45'],
        category:	'CUSTOM',
        defaultValue:	[],
        description:	null,
        id:	'test-number-tags3',
        label:	'Test number tags',
        placeholder:	null,
        type:	'numberTags'
      },
    );
    fixture.detectChanges();
    const invalidControl = component.customForm.get('test-number-tags3');

    invalidControl.setValue([1, 3, 5, 6]);
    fixture.detectChanges();

    expect(invalidControl.hasError('maxCount')).toEqual(true);

    invalidControl.setValue(1);
    fixture.detectChanges();

    expect(invalidControl.hasError('minCount')).toEqual(true);
  });

  it('should show url validation error', () => {
    fixture.detectChanges();

    const invalidControlEmail = component.customForm.get('test-url-component');

    invalidControlEmail.setValue('mysite');
    fixture.detectChanges();


    expect(invalidControlEmail.hasError('websiteValidator')).toEqual(true);
  });

  it('should show color validation error', () => {
    fixture.detectChanges();

    const invalidControlColor = component.customForm.get('test-color-component');

    invalidControlColor.setValue('333');
    fixture.detectChanges();

    expect(invalidControlColor.hasError('colorValidator')).toEqual(true);
  });

  it('should send data', () => {
    spyOn(component.formSubmitted, 'emit');
    component.showButton = true;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#successBtn')).nativeElement;

    submitButton.click();

    expect(component.formSubmitted.emit).toHaveBeenCalledTimes(1);
  });
});
