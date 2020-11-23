import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcTagElementComponent } from './oc-tag-element.component';

describe('OcTagElementComponent', () => {
  let component: OcTagElementComponent;
  let fixture: ComponentFixture<OcTagElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcTagElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTagElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
