import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppListGridComponent} from './oc-app-list-grid.component';

describe('OcAppListGridComponent', () => {
  let component: OcAppListGridComponent;
  let fixture: ComponentFixture<OcAppListGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppListGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
