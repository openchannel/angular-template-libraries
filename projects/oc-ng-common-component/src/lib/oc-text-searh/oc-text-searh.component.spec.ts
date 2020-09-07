import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcTextSearhComponent} from './oc-text-searh.component';

describe('OcTextSearhComponent', () => {
  let component: OcTextSearhComponent;
  let fixture: ComponentFixture<OcTextSearhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcTextSearhComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTextSearhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
