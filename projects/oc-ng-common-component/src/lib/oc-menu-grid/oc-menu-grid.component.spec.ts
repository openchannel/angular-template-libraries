import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OcMenuGridComponent} from './oc-menu-grid.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


describe('OcMenuGridComponent', () => {
  let component: OcMenuGridComponent;
  let fixture: ComponentFixture<OcMenuGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcMenuGridComponent],
      providers: [NgModel],
      imports: [FormsModule, CommonModule, BrowserModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcMenuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
