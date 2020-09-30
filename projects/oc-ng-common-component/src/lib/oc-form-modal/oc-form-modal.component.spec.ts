import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFormModalComponent } from './oc-form-modal.component';

describe('OcFormModalComponent', () => {
  let component: OcFormModalComponent;
  let fixture: ComponentFixture<OcFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
