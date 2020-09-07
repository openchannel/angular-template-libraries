import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppGalaryComponent} from './oc-app-galary.component';

describe('OcAppGalaryComponent', () => {
  let component: OcAppGalaryComponent;
  let fixture: ComponentFixture<OcAppGalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppGalaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
