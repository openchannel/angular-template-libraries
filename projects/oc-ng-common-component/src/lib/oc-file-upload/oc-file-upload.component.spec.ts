import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcFileUploadComponent} from './oc-file-upload.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

describe('OcFileUploadComponent', () => {
  let component: OcFileUploadComponent;
  let fixture: ComponentFixture<OcFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcFileUploadComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
