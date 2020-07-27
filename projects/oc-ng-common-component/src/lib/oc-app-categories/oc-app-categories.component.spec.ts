import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcAppCategoriesComponent } from './oc-app-categories.component';

describe('OcAppCategoriesComponent', () => {
  let component: OcAppCategoriesComponent;
  let fixture: ComponentFixture<OcAppCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcAppCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
