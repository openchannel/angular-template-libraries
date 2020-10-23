import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDropdownComponent } from './oc-dropdown.component';

describe('OcDropdownComponent', () => {
  let component: OcDropdownComponent;
  let fixture: ComponentFixture<OcDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
