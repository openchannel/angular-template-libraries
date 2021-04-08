import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcDynamicArrayItemComponent} from './oc-dynamic-array-item.component';
import {Component, Input} from '@angular/core';
import {By} from '@angular/platform-browser';
import {OcFormGenerator} from 'oc-ng-common-component/src/lib/form-components/oc-form/oc-form-generator';
import {FormArray, FormGroup} from '@angular/forms';
import {AppTypeFieldModel} from '../../../../../../../angular-common-service-library/dist/oc-ng-common-service';

@Component({
  selector: 'oc-title',
  template: ''
})
export class TitleMockComponent {
  @Input() title: string;
  @Input() customStyle: any;
}

@Component({
  selector: 'svg-icon',
  template: ''
})
export class SvgIconMockComponent {
  @Input() src: string;
}

@Component({
  selector: 'oc-dynamic-field-array',
  template: ''
})
export class DfaMockComponent {
  @Input() fieldDefinitionData: AppTypeFieldModel;
  @Input() dfaFormArray: FormArray;
}

describe('OcDynamicArrayItemComponent', () => {
  let component: OcDynamicArrayItemComponent;
  let fixture: ComponentFixture<OcDynamicArrayItemComponent>;
  const subFieldsArr = [
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
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDynamicArrayItemComponent, TitleMockComponent, SvgIconMockComponent, DfaMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDynamicArrayItemComponent);
    component = fixture.componentInstance;

    component.subFields = subFieldsArr;
    component.formFieldsData = {
      field1: 'Test label',
      'long-text-example': 'Test long text'
    };
    component.dfaForm = new FormGroup(OcFormGenerator.getFormByConfig(subFieldsArr));
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show data', () => {
    component.fieldLabelId = 'field1';

    fixture.detectChanges();

    const itemLabelTitle = fixture.debugElement.query(By.css('.form-card__header-text')).nativeElement;
    const arrayItemDataContent = fixture.debugElement.query(By.css('#fieldValue span')).nativeElement;

    expect(itemLabelTitle.textContent).toContain('Test label');
    expect(arrayItemDataContent.textContent).toContain('Test label');
  });

  it('should emit edit fields', () => {
    fixture.detectChanges();

    const editButton: HTMLButtonElement = fixture.debugElement.query(By.css('#editIconBtn')).nativeElement;

    spyOn(component.sendFieldData, 'emit');

    fixture.detectChanges();

    editButton.click();

    expect(component.sendFieldData.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit delete event', () => {
    const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('#deleteIconBtn')).nativeElement;

    spyOn(component.deleteField, 'emit');

    fixture.detectChanges();

    deleteButton.click();

    expect(component.deleteField.emit).toHaveBeenCalledWith(true);
  });

  it('should throw error',  () => {
    fixture.detectChanges();

    expect(() => component.subFields = undefined)
      .toThrowError('Required @Input : subFields');
  });
});


