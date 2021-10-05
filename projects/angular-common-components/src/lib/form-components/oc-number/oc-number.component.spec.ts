import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcNumberComponent } from './oc-number.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('OcNumberComponent', () => {
    let component: OcNumberComponent;
    let fixture: ComponentFixture<OcNumberComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcNumberComponent],
                imports: [FormsModule],
            }).compileComponents();
        }),
    );

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
        fixture.detectChanges();

        const numberInput = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            expect(numberInput.value).toContain('21');
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

    it('should contain value in input', async () => {
        component.writeValue('45g34');

        const numberInput: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            expect(numberInput.value).toEqual('4534');
        });
    });
});
