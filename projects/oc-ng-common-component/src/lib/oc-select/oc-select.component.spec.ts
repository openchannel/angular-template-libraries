import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcSelectComponent} from './oc-select.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcSelectComponent', () => {
  let component: OcSelectComponent;
  let fixture: ComponentFixture<OcSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcSelectComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
