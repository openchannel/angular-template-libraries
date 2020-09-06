import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcLoginComponent} from './oc-login.component';

describe('OcLoginComponent', () => {
  let component: OcLoginComponent;
  let fixture: ComponentFixture<OcLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
