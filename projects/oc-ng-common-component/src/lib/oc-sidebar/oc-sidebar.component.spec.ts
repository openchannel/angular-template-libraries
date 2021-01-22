import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcSidebarComponent } from './oc-sidebar.component';

describe('OcSidebarComponent', () => {
  let component: OcSidebarComponent;
  let fixture: ComponentFixture<OcSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
