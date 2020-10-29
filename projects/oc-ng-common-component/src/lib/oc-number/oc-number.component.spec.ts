import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcNumberComponent} from './oc-number.component';
import {FormsModule} from '@angular/forms';

describe('OcNumberComponent', () => {
  let component: OcNumberComponent;
  let fixture: ComponentFixture<OcNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcNumberComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain value', async () => {
    component.value = 21;

    const numberInput = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(numberInput.value).toContain(21);
      expect(component.inputNumber).toEqual(21);
    });
  });

  it('should bind input value to field', () => {
    const numberInput = fixture.nativeElement.querySelector('input');
    numberInput.value = 256;

    numberInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.inputNumber).toBe(256);
  });

  it('input should contain placeholder', () => {
    component.placeholder = 'Write test number here';

    const numberInput = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    expect(numberInput.placeholder).toEqual('Write test number here');
  });

  it('input should be disabled', async () => {
    component.setDisabledState(true);

    const numberInput = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(numberInput.disabled).toBeTruthy();
    });
  });

  it('should paste a value', async () => {
    const numberInput = fixture.nativeElement.querySelector('input');
    const clipboardEvent = new Event('paste', {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    // set `clipboardData` and `getData` properties. Set your mocked properties here
    clipboardEvent['clipboardData'] = {
      getData: () => '7'
    };

    numberInput.dispatchEvent(clipboardEvent);
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(component.inputNumber).toEqual(7);
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    const numberInput = fixture.nativeElement.querySelector('input');
    numberInput.value = 55;
    numberInput.dispatchEvent(new Event('input'));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe(55);
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    const numberInput = fixture.nativeElement.querySelector('input');
    numberInput.value = 28;
    numberInput.dispatchEvent(new Event('focus'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });
});
