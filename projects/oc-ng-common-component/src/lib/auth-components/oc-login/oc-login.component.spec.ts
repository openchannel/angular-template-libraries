import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcLoginComponent} from './oc-login.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcLoginComponent', () => {
  let component: OcLoginComponent;
  let fixture: ComponentFixture<OcLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcLoginComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
