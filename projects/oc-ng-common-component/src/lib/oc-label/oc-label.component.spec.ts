import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcLabelComponent} from './oc-label.component';

describe('OcLabelComponent', () => {
  let component: OcLabelComponent;
  let fixture: ComponentFixture<OcLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcLabelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
