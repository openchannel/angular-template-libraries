import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcPasswordComponent} from './oc-password.component';
import {FormsModule, NgModel} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';

describe('OcPasswordComponent', () => {
  let component: OcPasswordComponent;
  let fixture: ComponentFixture<OcPasswordComponent>;

  beforeEach(waitForAsync(() => {
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

  it('should contain value', () => {
    component.writeValue('Hello world!');
    expect(component.inputValue).toEqual('Hello world!');
  });

  it('should contain value in input', async () => {
    component.writeValue('Hello world!');

    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(input.value).toEqual('Hello world!');
    });
  });

  it('should bind input value to field', () => {
    const hostElement = fixture.nativeElement;
    const input = hostElement.querySelector('input');
    const newInputVal = 'quick BROWN fOx';
    input.value = newInputVal;

    // dispatch a DOM event so that Angular learns of input value change.
    // use new Event utility function (not provided by Angular) for better browser compatibility
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.inputValue).toBe(newInputVal);
  });

  it('input should contain placeholder', () => {
    component.placeholder = 'enter password';

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    fixture.detectChanges();

    expect(input.placeholder).toEqual('enter password');
  });

  it('input should be disabled', async () => {
    component.setDisabledState(true);

    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(input.disabled).toBeTruthy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test on change';
    input.dispatchEvent(new Event('input'));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe('test on change');
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test on change';
    input.dispatchEvent(new Event('blur'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });
});
