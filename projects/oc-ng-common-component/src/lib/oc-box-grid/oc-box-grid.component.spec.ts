import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcBoxGridComponent} from './oc-box-grid.component';

describe('OcBoxGridComponent', () => {
  let component: OcBoxGridComponent;
  let fixture: ComponentFixture<OcBoxGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcBoxGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcBoxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
