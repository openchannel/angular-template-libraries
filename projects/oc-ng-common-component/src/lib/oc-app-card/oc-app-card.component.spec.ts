import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAppCardComponent } from './oc-app-card.component';

describe('OcAppCardComponent', () => {
  let component: OcAppCardComponent;
  let fixture: ComponentFixture<OcAppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
