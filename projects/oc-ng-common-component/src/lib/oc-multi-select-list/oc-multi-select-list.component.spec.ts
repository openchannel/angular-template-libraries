import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcMultiSelectListComponent } from './oc-multi-select-list.component';

describe('OcMultiSelectListComponent', () => {
  let component: OcMultiSelectListComponent;
  let fixture: ComponentFixture<OcMultiSelectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcMultiSelectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMultiSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
