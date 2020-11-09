import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDynamicArrayItemComponent } from './oc-dynamic-array-item.component';

describe('OcDynamicArrayItemComponent', () => {
  let component: OcDynamicArrayItemComponent;
  let fixture: ComponentFixture<OcDynamicArrayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDynamicArrayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDynamicArrayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
