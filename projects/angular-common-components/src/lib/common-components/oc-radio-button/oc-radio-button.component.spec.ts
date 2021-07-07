import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRadioButtonComponent } from './oc-radio-button.component';

describe('OcRadioButtonComponent', () => {
  let component: OcRadioButtonComponent;
  let fixture: ComponentFixture<OcRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcRadioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
