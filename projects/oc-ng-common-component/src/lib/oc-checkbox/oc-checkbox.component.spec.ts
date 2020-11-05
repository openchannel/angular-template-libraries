import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcCheckboxComponent} from './oc-checkbox.component';
import {FormsModule} from '@angular/forms';

describe('OcCheckboxComponent', () => {
  let component: OcCheckboxComponent;
  let fixture: ComponentFixture<OcCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcCheckboxComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain status value', () => {
    component.writeValue(true);
    expect(component.checked).toEqual(true);
  });

  it('should set status value', () => {
    component.isChecked = true;
    expect(component.checked).toEqual(true);
  });

  it('should change status value', async () => {
    component.writeValue(true);

    const checkbox = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(checkbox.checked).toEqual(true);
    });
  });

  it('should be disabled', async () => {
    component.setDisabledState(true);

    const checkbox = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(checkbox.disabled).toBeTruthy();
    });
  });

  it('should contain label text', async () => {
    component.labelText = 'Test label text';

    const checkboxLabelText = fixture.nativeElement.querySelector('.checkbox-text');
    fixture.detectChanges();

    expect(component.labelText).toEqual('Test label text');
    await fixture.whenStable().then(() => {
      expect(checkboxLabelText.textContent.trim()).toEqual('Test label text');
    });
  });

  it('should be required', async () => {
    component.requiredIndicator = true;

    fixture.detectChanges();

    const checkboxIndicator = fixture.nativeElement.querySelector('.required');

    expect(component.requiredIndicator).toEqual(true);
    await fixture.whenStable().then(() => {
      expect(checkboxIndicator).toBeTruthy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    const checkbox = fixture.nativeElement.querySelector('input');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe(true);
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    const checkbox = fixture.nativeElement.querySelector('input');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('focus'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });

  it('should change value on label click', async () => {
    const label = fixture.nativeElement.querySelector('label');

    label.click();
    fixture.detectChanges();

    expect(component.checked).toEqual(true);
  });
});
