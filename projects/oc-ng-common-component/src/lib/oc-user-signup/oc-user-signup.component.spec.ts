import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcUserSignupComponent} from './oc-user-signup.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcUserSignupComponent', () => {
  let component: OcUserSignupComponent;
  let fixture: ComponentFixture<OcUserSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcUserSignupComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcUserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
