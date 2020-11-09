import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcPopupComponent} from './oc-popup.component';

describe('OcPopupComponent', () => {
  let component: OcPopupComponent;
  let fixture: ComponentFixture<OcPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
