import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRadioComponent } from './oc-radio.component';

describe('OcRadioComponent', () => {
  let component: OcRadioComponent;
  let fixture: ComponentFixture<OcRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
