import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcColorComponent } from './oc-color.component';

describe('OcColorComponent', () => {
  let component: OcColorComponent;
  let fixture: ComponentFixture<OcColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
