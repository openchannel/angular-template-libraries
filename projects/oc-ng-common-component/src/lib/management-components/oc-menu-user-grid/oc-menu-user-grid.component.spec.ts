import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcMenuUserGridComponent } from './oc-menu-user-grid.component';

describe('OcMenuUserGridComponent', () => {
  let component: OcMenuUserGridComponent;
  let fixture: ComponentFixture<OcMenuUserGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcMenuUserGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMenuUserGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
