import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAppDescriptionComponent } from './oc-app-description.component';

describe('OcAppDescriptionComponent', () => {
  let component: OcAppDescriptionComponent;
  let fixture: ComponentFixture<OcAppDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAppDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
