import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcRadioButtonListComponent } from './oc-radio-button-list.component';
import { MockRadioButtonComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('OcRadioButtonListComponent', () => {
    let component: OcRadioButtonListComponent;
    let fixture: ComponentFixture<OcRadioButtonListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OcRadioButtonListComponent, MockRadioButtonComponent],
            imports: [ReactiveFormsModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OcRadioButtonListComponent);
        component = fixture.componentInstance;
        component.itemsArray = [
            {
                label: 'Angular',
                value: 'angular',
            },
            {
                label: 'React',
                value: 'react',
            },
            {
                label: 'Vue',
                value: 'vue',
            },
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should generate radio group', () => {
        component.radioButtonGroup = 'framework';
        component.value = 'vue';

        fixture.detectChanges();

        const radioArray = fixture.debugElement.queryAll(By.css('.radio-button-list__item'));
        expect(radioArray.length).toEqual(3);
    });

    it('should write a value', () => {
        component.writeValue('react');
        fixture.detectChanges();
        expect(component.componentValue).toEqual('react');
    });

    it('should disable the component', () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        expect(component.disabled).toEqual(true);
    });

});
