import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcForgotPasswordComponent} from './oc-forgot-password.component';

describe('OcForgotPasswordComponent', () => {
  let component: OcForgotPasswordComponent;
  let fixture: ComponentFixture<OcForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcForgotPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
