import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSelectExpandableComponent } from './oc-select-expandable.component';

describe('OcSelectExpandableComponent', () => {
  let component: OcSelectExpandableComponent;
  let fixture: ComponentFixture<OcSelectExpandableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcSelectExpandableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSelectExpandableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
