import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcSelectComponent} from './oc-select.component';

describe('OcSelectComponent', () => {
  let component: OcSelectComponent;
  let fixture: ComponentFixture<OcSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
