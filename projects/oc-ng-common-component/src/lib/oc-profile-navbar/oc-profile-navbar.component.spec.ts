import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcProfileNavbarComponent } from './oc-profile-navbar.component';
import {By} from '@angular/platform-browser';

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

  it('should show data', () => {
    component.username = 'Test Username';
    component.initials = 'TU';
    component.role = 'admin';
    fixture.detectChanges();

    const usernameField = fixture.debugElement.query(By.css('.profile-navbar__username')).nativeElement;
    const initialsField = fixture.debugElement.query(By.css('.profile-navbar__initials')).nativeElement;
    const roleField = fixture.debugElement.query(By.css('.profile-navbar__role')).nativeElement;

    expect(usernameField.textContent).toEqual('Test Username');
    expect(initialsField.textContent).toEqual('TU');
    expect(roleField.textContent).toEqual('admin');
  });

  it('should show dropdown', () => {
    component.username = 'Test Username';
    fixture.detectChanges();
    const toggle = fixture.debugElement.query(By.css('#navbarDropdown')).nativeElement;
    toggle.click();

    const dropdown = fixture.debugElement.query(By.css('.dropdown-item')).nativeElement;
    expect(dropdown).toBeTruthy();
  });
});
