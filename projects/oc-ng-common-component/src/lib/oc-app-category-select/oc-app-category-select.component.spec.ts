import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppCategorySelectComponent} from './oc-app-category-select.component';

describe('OcAppCategorySelectComponent', () => {
  let component: OcAppCategorySelectComponent;
  let fixture: ComponentFixture<OcAppCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppCategorySelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
