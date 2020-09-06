import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcPasswordComponent} from './oc-password.component';

describe('OcPasswordComponent', () => {
  let component: OcPasswordComponent;
  let fixture: ComponentFixture<OcPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
