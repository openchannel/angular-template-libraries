import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcMultiSelectCheckboxListComponent } from './oc-multi-select-checkbox-list.component';

describe('OcMultiSelectCheckboxListComponent', () => {
  let component: OcMultiSelectCheckboxListComponent;
  let fixture: ComponentFixture<OcMultiSelectCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcMultiSelectCheckboxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMultiSelectCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
