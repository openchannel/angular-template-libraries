import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcResendActivationComponent } from './oc-resend-activation.component';

describe('OcResendActivationComponent', () => {
  let component: OcResendActivationComponent;
  let fixture: ComponentFixture<OcResendActivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcResendActivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcResendActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
