import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcInputComponent} from './oc-input.component';
import {FormsModule} from '@angular/forms';

describe('OcInputComponent', () => {
  let component: OcInputComponent;
  let fixture: ComponentFixture<OcInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcInputComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcInputComponent);
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
    component.placeholder = 'test input';

    const input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    expect(input.placeholder).toEqual('test input');
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
