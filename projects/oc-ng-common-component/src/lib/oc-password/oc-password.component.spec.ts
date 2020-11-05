import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcPasswordComponent} from './oc-password.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

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

  it('input should contain placeholder', () => {
    component.placeholder = 'enter password';

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();

    expect(input.placeholder).toEqual('enter password');
  });

  it('should emit a value', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'mypass';

    spyOn(component.modelNameChange, 'emit');

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.modelName).toEqual('mypass');
    expect(component.modelNameChange.emit).toHaveBeenCalledWith('mypass');
  });
});
