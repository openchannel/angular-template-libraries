import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppGetStartedComponent} from './oc-app-get-started.component';

describe('OcAppGetStartedComponent', () => {
  let component: OcAppGetStartedComponent;
  let fixture: ComponentFixture<OcAppGetStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppGetStartedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppGetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
