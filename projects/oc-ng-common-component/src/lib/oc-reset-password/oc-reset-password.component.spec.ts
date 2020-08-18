import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcResetPasswordComponent } from './oc-reset-password.component';

describe('OcResetPasswordComponent', () => {
  let component: OcResetPasswordComponent;
  let fixture: ComponentFixture<OcResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
