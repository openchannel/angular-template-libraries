import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcTextareaComponent} from './oc-textarea.component';

describe('OcTextareaComponent', () => {
  let component: OcTextareaComponent;
  let fixture: ComponentFixture<OcTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcTextareaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
