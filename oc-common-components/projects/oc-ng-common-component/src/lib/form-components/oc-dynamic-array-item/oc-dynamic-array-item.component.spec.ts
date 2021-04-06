import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDynamicArrayItemComponent } from './oc-dynamic-array-item.component';
import { Component, Input, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'oc-title',
  template: ''
})
export class TitleMockComponent {
  @Input() title: string;
  @Input() customStyle: any;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDynamicArrayItemComponent, TitleMockComponent ],
      providers: [
        {provide: NgbModal, useClass: ModalDialogMock}
      ]
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show data', () => {
    component.fieldLabelId = 'field1';

    fixture.detectChanges();

    const itemLabel: HTMLDivElement = fixture.debugElement.query(By.css('#itemLabel')).nativeElement;
    const itemLabelTitle: HTMLSpanElement = fixture.debugElement.query(By.css('#itemLabel span')).nativeElement;

    itemLabel.click();
    fixture.detectChanges();

    const arrayItemDataContent = fixture.debugElement.query(By.css('#fieldValue')).nativeElement;

    expect(itemLabelTitle.textContent).toContain('Test label');
    expect(arrayItemDataContent.textContent).toContain('Test label');
  });

  it('should emit edit fields', () => {
    const editButton: HTMLButtonElement = fixture.debugElement.query(By.css('#editBtn')).nativeElement;

    spyOn(component.sendFieldData, 'emit');

    fixture.detectChanges();

    editButton.click();

    expect(component.sendFieldData.emit).toHaveBeenCalledWith({
      field1: 'New Test label',
      'long-text-example': 'New Test long text'
    });
  });

  it('should emit copy fields', () => {
    const copyButton: HTMLButtonElement = fixture.debugElement.query(By.css('#copyBtn')).nativeElement;

    spyOn(component.copyField, 'emit');

    fixture.detectChanges();

    copyButton.click();

    expect(component.copyField.emit).toHaveBeenCalledWith(subFieldsArr);
  });

  it('should emit delete event', () => {
    const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('#deleteBtn')).nativeElement;

    spyOn(component.deleteField, 'emit');

    fixture.detectChanges();

    deleteButton.click();

    expect(component.deleteField.emit).toHaveBeenCalledWith(true);
  });
});

@Directive()
export class ModalDialogMock {
  @Input() formJSONData: any;

  value = {
    status: 'success',
    data: {
      field1: 'New Test label',
      'long-text-example': 'New Test long text'
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

