import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcInputComponent } from './oc-input.component';

describe('OcInputComponent', () => {
  let component: OcInputComponent;
  let fixture: ComponentFixture<OcInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
