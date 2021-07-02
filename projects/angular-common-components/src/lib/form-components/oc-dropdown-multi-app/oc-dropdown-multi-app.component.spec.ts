import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropdownMultiAppComponent } from './oc-dropdown-multi-app.component';

describe('OcDropdownMultiAppComponent', () => {
  let component: OcDropdownMultiAppComponent;
  let fixture: ComponentFixture<OcDropdownMultiAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcDropdownMultiAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropdownMultiAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
