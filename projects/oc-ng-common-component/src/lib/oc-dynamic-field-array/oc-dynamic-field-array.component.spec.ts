import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDynamicFieldArrayComponent } from './oc-dynamic-field-array.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'oc-dynamic-array-item',
  template: ''
})
export class DynamicArrayItemMockComponent {
  @Input() index: number = 0;
  @Input() fieldLabelId: string = '';
  @Input() formFieldsData: any;
  @Input() subFields: any[];
  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() copyField: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFieldData: EventEmitter<any> = new EventEmitter<any>();
}

@Component({
  selector: 'oc-button',
  template: ''
})
export class ButtonMockComponent {
  @Input() text: string = '';
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
}
describe('OcDynamicFieldArrayComponent', () => {
  let component: OcDynamicFieldArrayComponent;
  let fixture: ComponentFixture<OcDynamicFieldArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDynamicFieldArrayComponent, DynamicArrayItemMockComponent, ButtonMockComponent ],
      providers: [
        {provide: NgbModal, useClass: ModalDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDynamicFieldArrayComponent);
    component = fixture.componentInstance;
    component.fieldDefinition = {
      attributes:    {
        maxCount: null,
        minCount: null,
        ordering: 'append',
        required:	null,
        rowLabel:	'field1'
      },
      required: null,
      rowLabel: null,
      category: 'CUSTOM',
      defaultValue: null,
      description: '',
      id: 'test-dynamic-field-array',
      isOpen: false,
      isValid: true,
      label: 'Test Dynamic field array',
      placeholder: null,
      subFieldDefinitions:   [
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
          isOpen: false,
          isValid: true,
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add array item', () => {
    const button = fixture.debugElement.query(By.css('oc-button')).nativeElement;
    button.click();

    fixture.detectChanges();

    const arrayItem = fixture.debugElement.queryAll(By.css('oc-dynamic-array-item'));

    expect(arrayItem.length).toBeGreaterThan(0);
    expect(component.fieldsDataArray.length).toBeGreaterThan(0);
    expect(component.fieldsDataArray[0]).toEqual(
      {field1: 'Test label',
      'long-text-example': 'Test long text'}
      );
  });

  it('should set array item values', () => {
    component.value = [{field1: 'Test label',
      'long-text-example': 'Test long text'}];

    fixture.detectChanges();

    const arrayItem = fixture.debugElement.queryAll(By.css('oc-dynamic-array-item'));

    expect(arrayItem.length).toBeGreaterThan(0);
    expect(component.fieldsDataArray[0]).toEqual(
      {field1: 'Test label',
        'long-text-example': 'Test long text'}
    );
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    component.getNewItemFieldsData({field1: 'Test label 2',
          'long-text-example': 'Test long text 2'}, 0);

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toEqual([{field1: 'Test label 2',
      'long-text-example': 'Test long text 2'}]);
  });

  it('should copy array item', async () => {
    component.value = [{field1: 'Test label',
      'long-text-example': 'Test long text'}];

    fixture.detectChanges();

    component.duplicateField([
      {
        attributes: {
          maxChars: null,
          minChars: null,
          required: null
        },
        category: 'CUSTOM',
        defaultValue: 'Test label',
        description: 'some description',
        id: 'field1',
        isOpen: false,
        isValid: true,
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
        defaultValue: 'Test long text',
        attributes: {
          maxChars:	200,
          required:	null,
          minChars:	2
        },
      }
    ]);

    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(component.fieldsDataArray[1]).toEqual({field1: 'Test label',
        'long-text-example': 'Test long text'});
      expect(component.fieldsDataArray.length).toEqual(2);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class ModalDialogMock {
  @Input() formJSONData: any;
  value = {
    status: 'success',
    data: {
      field1: 'Test label',
      'long-text-example': 'Test long text'
    }
  };
  result: Promise <any> = new Promise<any>(resolve => resolve(this.value));
  open() {
    const componentInstance = {
      formJSONData: undefined
    };
    return {
      componentInstance,
      result: this.result
    };
  }
}
