import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcFormComponent } from './oc-form.component';

describe('OcFormComponent', () => {
  let component: OcFormComponent;
  let fixture: ComponentFixture<OcFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
