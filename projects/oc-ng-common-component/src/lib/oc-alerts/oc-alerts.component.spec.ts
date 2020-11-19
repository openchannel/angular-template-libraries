import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAlertsComponent } from './oc-alerts.component';

describe('OcAlertsComponent', () => {
  let component: OcAlertsComponent;
  let fixture: ComponentFixture<OcAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAlertsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


