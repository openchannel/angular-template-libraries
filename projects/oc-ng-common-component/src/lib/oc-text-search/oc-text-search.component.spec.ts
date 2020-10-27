import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcTextSearchComponent} from './oc-text-search.component';

describe('OcTextSearhComponent', () => {
  let component: OcTextSearchComponent;
  let fixture: ComponentFixture<OcTextSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcTextSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTextSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
