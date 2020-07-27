import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcCommonLibComponent } from './oc-ng-common-component.component';

describe('OcCommonLibComponent', () => {
  let component: OcCommonLibComponent;
  let fixture: ComponentFixture<OcCommonLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcCommonLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcCommonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
