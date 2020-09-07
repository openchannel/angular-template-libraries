import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcSignupComponent} from './oc-signup.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcSignupComponent', () => {
  let component: OcSignupComponent;
  let fixture: ComponentFixture<OcSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcSignupComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
