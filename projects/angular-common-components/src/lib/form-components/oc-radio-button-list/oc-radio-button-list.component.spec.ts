import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRadioButtonListComponent } from './oc-radio-button-list.component';

describe('OcRadioButtonListComponent', () => {
  let component: OcRadioButtonListComponent;
  let fixture: ComponentFixture<OcRadioButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcRadioButtonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcRadioButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
