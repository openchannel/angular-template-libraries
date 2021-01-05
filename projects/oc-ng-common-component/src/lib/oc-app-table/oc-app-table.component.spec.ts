import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OcAppTableComponent} from './oc-app-table.component.ts';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


describe('OcMenuGridComponent', () => {
  let component: OcAppTableComponent;
  let fixture: ComponentFixture<OcAppTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcAppTableComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
