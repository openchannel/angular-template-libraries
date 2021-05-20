import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcColorComponent } from './oc-color.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

describe('OcColorComponent', () => {
    let component: OcColorComponent;
    let fixture: ComponentFixture<OcColorComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcColorComponent],
                imports: [FormsModule, ColorPickerModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcColorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain a color value', () => {
        component.writeValue('#26c6da');
        expect(component.colorValue).toEqual('#26c6da');
    });

    it('should set a color value', () => {
        component.value = '#26c6da';
        expect(component.colorValue).toEqual('#26c6da');
    });

    it('should change color picker position', () => {
        component.colorPickerPosition = 'right';
        expect(component.colorPickerPosition).toEqual('right');
    });

    it(
        'should contain a color in input',
        waitForAsync(() => {
            component.writeValue('#26c6da');

            const input = fixture.nativeElement.querySelector('.color-adjust__input');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(input.value).toEqual('#26c6da');
            });
        }),
    );

    it('should bind color input value to field', () => {
        const input = fixture.nativeElement.querySelector('.color-adjust__input');
        const newInputVal = '#26c6da';

        input.value = newInputVal;

        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.colorValue).toBe(newInputVal);
    });

    it('input should contain placeholder', () => {
        component.placeholder = 'test placeholder';

        const input = fixture.nativeElement.querySelector('.color-adjust__input');
        fixture.detectChanges();

        expect(input.placeholder).toEqual('test placeholder');
    });

    it(
        'should be disabled',
        waitForAsync(() => {
            component.setDisabledState(true);

            const input = fixture.nativeElement.querySelector('.color-adjust__input');
            fixture.detectChanges();

            fixture.whenStable().then(() => {
                expect(input.disabled).toBeTruthy();
            });
        }),
    );

    it(
        'should call onChange with value',
        waitForAsync(() => {
            const onChangeFunc = jest.fn();
            component.registerOnChange(onChangeFunc);

            const colorInput = fixture.nativeElement.querySelector('.color-adjust__input');
            colorInput.value = '#26c6da';

            colorInput.dispatchEvent(new Event('input'));

            expect(onChangeFunc).toHaveBeenCalled();
            expect(onChangeFunc.mock.calls[0][0]).toBe('#26c6da');
        }),
    );

    it(
        'should call onTouch',
        waitForAsync(() => {
            const onTouchedFunc = jest.fn();
            component.registerOnTouched(onTouchedFunc);

            const colorInput = fixture.nativeElement.querySelector('.color-adjust__input');
            colorInput.dispatchEvent(new Event('focus'));

            expect(onTouchedFunc).toHaveBeenCalled();
        }),
    );
});
