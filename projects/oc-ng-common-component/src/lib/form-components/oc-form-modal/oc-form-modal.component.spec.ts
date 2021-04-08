import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcFormModalComponent} from './oc-form-modal.component';
import {By} from '@angular/platform-browser';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

const formData = {
  name: 'Test name',
  role: 'admin',
  aboutme: '',
  skills: ['angular']
};

@Component({
  template: '',
  selector: 'oc-form'
})
export class OcFormMockComponent {
  @Input() formJsonData: any;
  @Input() successButtonText: string = 'Submit';
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  submitForm() {
    this.formSubmitted.emit(formData);
  }
}
describe('OcFormModalComponent', () => {
  let component: OcFormModalComponent;
  let fixture: ComponentFixture<OcFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcFormModalComponent, OcFormMockComponent ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFormModalComponent);
    component = fixture.componentInstance;

    component.formJSONData = {
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
          label: 'aboutme',
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
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should show form', () => {
    fixture.detectChanges();

    const formComponent = fixture.debugElement.query(By.css('oc-form'));
    expect(formComponent).toBeTruthy();
  });

  it('should catch form data', () => {
    fixture.detectChanges();

    const formComponent: OcFormMockComponent = fixture.debugElement.query(By.css('oc-form')).componentInstance;

    formComponent.submitForm();

    expect(component.modalJSONData).toBeNull();
  });

  it('should close the modal', () => {
    spyOn(component, 'dismiss');
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(By.css('button')).nativeElement;

    closeBtn.click();

    expect(component.close).toHaveBeenCalled();
  });
});
