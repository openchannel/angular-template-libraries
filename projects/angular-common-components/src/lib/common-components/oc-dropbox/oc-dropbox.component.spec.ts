import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcDropboxComponent } from './oc-dropbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('OcDropboxComponent', () => {
    let component: OcDropboxComponent;
    let fixture: ComponentFixture<OcDropboxComponent>;

    const enterKeyUpEvent = new KeyboardEvent('keyup', {
        code: 'Enter',
        key: 'Enter',
    });
    const notExistingValue = 'Not Existing value';

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcDropboxComponent],
                imports: [NgbModule, FormsModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDropboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.items = ['selected1', 'selected2', 'selected3', 'other'];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain selected value', () => {
        component.writeValue('selected2');
        expect(component.outputSelectedItem).toEqual('selected2');
    });

    it('should show selected value', async () => {
        component.writeValue('selected2');

        fixture.detectChanges();

        const dropbox = fixture.nativeElement.querySelector('input');

        await fixture.whenStable().then(() => {
            expect(component.outputSelectedItem).toEqual('selected2');
            expect(dropbox.value).toContain('selected2');
        });
    });

    it('should contain a placeholder', () => {
        component.placeHolder = 'Test placeholder';
        fixture.detectChanges();

        const dropbox = fixture.nativeElement.querySelector('input');

        expect(dropbox.placeholder).toEqual('Test placeholder');
    });

    it('should be disabled', async () => {
        component.setDisabledState(true);

        const dropbox = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            expect(dropbox.disabled).toBeTruthy();
        });
    });

    it('should change selected value', async () => {
        component.writeValue('selected2');

        jest.spyOn(component.selectedItem, 'emit');

        const dropbox = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        dropbox.click();
        fixture.detectChanges();

        const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];
        selectedButton.click();

        await fixture.whenStable().then(() => {
            expect(component.outputSelectedItem).toEqual('selected1');
            expect(dropbox.value).toContain('selected1');
            expect(component.selectedItem.emit).toHaveBeenCalledWith('selected1');
        });
    });

    it('should filter values', () => {
        component.clearFormAfterSelect = true;

        const dropbox = fixture.nativeElement.querySelector('input');
        dropbox.value = 'oth';
        dropbox.click();
        fixture.detectChanges();

        const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];

        expect(selectedButton.textContent).toContain('other');
    });

    it('should call onChange with value', async () => {
        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        component.writeValue('selected2');

        const dropbox = fixture.nativeElement.querySelector('input');
        dropbox.click();
        fixture.detectChanges();

        const selectedButton = fixture.nativeElement.querySelectorAll('button')[0];
        selectedButton.click();

        expect(onChangeFunc).toHaveBeenCalled();
        expect(onChangeFunc.mock.calls[0][0]).toBe('selected1');
    });

    it('should call onTouch', async () => {
        const onTouchedFunc = jest.fn();
        component.registerOnTouched(onTouchedFunc);

        const dropbox = fixture.nativeElement.querySelector('input');
        dropbox.dispatchEvent(new Event('focus'));

        expect(onTouchedFunc).toHaveBeenCalled();
    });

    it('should prevent add custom items by enter key up, when corresponding flag is set to true', async () => {
        const selectedItemEmitFunction = jest.spyOn(component.selectedItem, 'emit');

        component.disableAddCustomItemsByEnter = true;
        fixture.detectChanges();

        const dropbox = fixture.nativeElement.querySelector('input');
        dropbox.focus();
        dropbox.value = notExistingValue;
        fixture.detectChanges();

        dropbox.dispatchEvent(enterKeyUpEvent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(selectedItemEmitFunction).not.toHaveBeenCalled();
        });
    });

    it('should add custom items by enter key up, when corresponding flag is set to false (by default)', async () => {
        const selectedItemEmitFunction = jest.spyOn(component.selectedItem, 'emit');

        const dropbox = fixture.nativeElement.querySelector('input');
        dropbox.focus();
        dropbox.value = notExistingValue;
        fixture.detectChanges();

        dropbox.dispatchEvent(enterKeyUpEvent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(selectedItemEmitFunction).toHaveBeenCalledWith(notExistingValue);
        });
    });
});
