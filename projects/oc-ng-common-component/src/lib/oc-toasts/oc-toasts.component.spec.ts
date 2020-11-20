import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcToastsComponent } from './oc-toasts.component';

describe('OcAlertsComponent', () => {
  let component: OcToastsComponent;
  let fixture: ComponentFixture<OcToastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcToastsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


