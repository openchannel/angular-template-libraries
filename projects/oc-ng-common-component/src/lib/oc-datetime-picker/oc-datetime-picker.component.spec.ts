import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDatetimePickerComponent } from './oc-datetime-picker.component';

describe('OcDatetimePickerComponent', () => {
  let component: OcDatetimePickerComponent;
  let fixture: ComponentFixture<OcDatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDatetimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
