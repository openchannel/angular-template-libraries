import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSignupComponent } from './oc-signup.component';

describe('OcSignupComponent', () => {
  let component: OcSignupComponent;
  let fixture: ComponentFixture<OcSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
