import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRadioButtonComponent } from './oc-radio-button.component';
import { By } from '@angular/platform-browser';
import { TransformTextPipe } from '@openchannel/angular-common-components/src/lib/common-components';

describe('OcRadioButtonComponent', () => {
    let component: OcRadioButtonComponent;
    let fixture: ComponentFixture<OcRadioButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcRadioButtonComponent, TransformTextPipe],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcRadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the Label text', () => {
        component.labelText = 'Test label';
        fixture.detectChanges();

        const label = fixture.debugElement.query(By.css('.form-radio-button__label')).nativeElement;
        expect(label.textContent.trim()).toEqual('Test label');
    });

    it('should contain value', () => {
        component.value = 'test';
        fixture.detectChanges();

        component.writeValue('test');
        fixture.detectChanges();
        expect(component.radioButtonValue).toEqual('test');
        expect(component.isChecked).toEqual(true);
    });

    it('should call onChange with value', async () => {
        component.value = 'test';
        fixture.detectChanges();
        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        const radio = fixture.debugElement.query(By.css('input')).nativeElement;
        radio.click();

        expect(onChangeFunc).toHaveBeenCalled();
        expect(onChangeFunc.mock.calls[0][0]).toBe('test');
    });

    it('should disable the component', () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(component.disabled).toEqual(true);
    });
});
