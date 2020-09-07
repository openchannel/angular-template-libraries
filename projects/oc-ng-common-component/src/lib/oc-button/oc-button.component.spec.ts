import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcButtonComponent} from './oc-button.component';

describe('OcButtonComponent', () => {
  let component: OcButtonComponent;
  let fixture: ComponentFixture<OcButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
