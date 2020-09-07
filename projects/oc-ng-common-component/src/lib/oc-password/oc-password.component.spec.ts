import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcPasswordComponent} from './oc-password.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcPasswordComponent', () => {
  let component: OcPasswordComponent;
  let fixture: ComponentFixture<OcPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule],
      declarations: [OcPasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
