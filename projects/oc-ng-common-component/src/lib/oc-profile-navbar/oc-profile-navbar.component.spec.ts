import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcProfileNavbarComponent } from './oc-profile-navbar.component';

describe('OcProfileNavbarComponent', () => {
  let component: OcProfileNavbarComponent;
  let fixture: ComponentFixture<OcProfileNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcProfileNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcProfileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
