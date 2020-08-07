import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAppStatusDetailsComponent } from './oc-app-status-details.component';

describe('OcAppBasicDetailsComponent', () => {
  let component: OcAppStatusDetailsComponent;
  let fixture: ComponentFixture<OcAppStatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAppStatusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppStatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
