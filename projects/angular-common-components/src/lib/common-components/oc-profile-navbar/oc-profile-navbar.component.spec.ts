import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { OcProfileNavbarComponent } from './oc-profile-navbar.component';
import {By} from '@angular/platform-browser';

describe('OcProfileNavbarComponent', () => {
  let component: OcProfileNavbarComponent;
  let fixture: ComponentFixture<OcProfileNavbarComponent>;

  beforeEach(waitForAsync(() => {
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
});
