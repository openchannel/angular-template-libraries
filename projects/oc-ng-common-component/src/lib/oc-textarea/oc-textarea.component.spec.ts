import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcTextareaComponent} from './oc-textarea.component';
import { FormsModule } from '@angular/forms';

describe('OcTextareaComponent', () => {
  let component: OcTextareaComponent;
  let fixture: ComponentFixture<OcTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OcTextareaComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain value', () => {
    component.writeValue('Test value');
    expect(component.textAreaValue).toEqual('Test value');
  });

  it('should set value', () => {
    component.value = 'Input value';
    expect(component.textAreaValue).toEqual('Input value');
  });

  it('should contain value in textarea', async () => {
    component.writeValue('Test value');

    const textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(textarea.value).toEqual('Test value');
    });
  });

  it('textarea should contain placeholder', () => {
    component.placeholder = 'Textarea placeholder';

    const textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();

    expect(textarea.placeholder).toEqual('Textarea placeholder');
  });

  it('textarea should contain the rows', () => {
    component.rows = 4;

    const textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();

    expect(textarea.rows).toEqual(4);
  });

  it('textarea should be required', () => {
    component.required = true;

    const textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();

    expect(textarea.required).toEqual(true);
  });

  it('textarea should be disabled', async () => {
    component.setDisabledState(true);

    const textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(textarea.disabled).toBeTruthy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'test on change';
    textarea.dispatchEvent(new Event('input'));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe('test on change');
  });

  it('should call onTouch', async () => {
    const onTouchedFunc = jest.fn();
    component.registerOnTouched(onTouchedFunc);

    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = 'test on change';
    textarea.dispatchEvent(new Event('focus'));

    expect(onTouchedFunc).toHaveBeenCalled();
  });
});
