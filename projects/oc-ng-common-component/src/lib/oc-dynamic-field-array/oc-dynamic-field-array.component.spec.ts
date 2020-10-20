import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDynamicFieldArrayComponent } from './oc-dynamic-field-array.component';

describe('OcDynamicFieldArrayComponent', () => {
  let component: OcDynamicFieldArrayComponent;
  let fixture: ComponentFixture<OcDynamicFieldArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDynamicFieldArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDynamicFieldArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
