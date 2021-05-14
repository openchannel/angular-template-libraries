import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcDynamicArrayItemComponent } from './oc-dynamic-array-item.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OcFormGenerator } from '@openchannel/angular-common-components/src/lib/form-components/oc-form/oc-form-generator';
import { FormArray, FormGroup } from '@angular/forms';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import {
    MockDynamicArrayPreview,
    MockDynamicFieldArrayComponent,
    MockSvgIconComponent,
    MockTitleComponent,
} from '@openchannel/angular-common-components/src/mock/mock';

@Component({
    selector: 'svg-icon',
    template: '',
})
export class SvgIconMockComponent {
    @Input() src: string;
}

@Component({
    selector: 'oc-dynamic-field-array',
    template: '',
})
export class DfaMockComponent {
    @Input() fieldDefinitionData: AppTypeFieldModel;
    @Input() dfaFormArray: FormArray;
}

describe('OcDynamicArrayItemComponent', () => {
    let component: OcDynamicArrayItemComponent;
    let fixture: ComponentFixture<OcDynamicArrayItemComponent>;
    const typeWithFields: AppTypeFieldModel = {
        id: '',
        label: '',
        type: '',
        fields: [
            {
                attributes: {
                    maxChars: null,
                    minChars: null,
                    required: null,
                },
                defaultValue: 'Test label',
                description: 'some description',
                id: 'labelFieldId',
                label: 'Test label',
                placeholder: 'write some text',
                type: 'text',
            },
            {
                id: 'long-text-example',
                label: 'Long Text Example',
                type: 'longText',
                placeholder: 'Write your text here...',
                defaultValue: 'Test long text',
                attributes: {
                    maxChars: 200,
                    required: null,
                    minChars: 2,
                },
            },
        ],
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcDynamicArrayItemComponent,
                    MockTitleComponent,
                    MockSvgIconComponent,
                    MockDynamicFieldArrayComponent,
                    MockDynamicArrayPreview,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDynamicArrayItemComponent);
        component = fixture.componentInstance;
        component.currentFieldDefinition = typeWithFields;
        component.formFieldsData = {
            labelFieldId: 'Test label',
            'long-text-example': 'Test long text',
        };
        component.dfaForm = new FormGroup(OcFormGenerator.getFormByConfig(typeWithFields.fields));
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('show default label', () => {
        component.index = 5;
        fixture.detectChanges();
        expect(getLabelText()).toEqual('Item 6');
    });

    it('show custom label', () => {
        component.fieldLabelId = 'labelFieldId';
        fixture.detectChanges();
        expect(getLabelText()).toEqual('Test label');
    });

    it('should map default field values to a new object for oc-dynamic-array-preview', () => {
        fixture.detectChanges();
        expect(component.fieldValues[0].fieldId).toEqual('labelFieldId');
        expect(component.fieldValues[0].fieldValue).toEqual('Test label');
    });

    it('should emit edit fields', () => {
        fixture.detectChanges();

        const editButton: HTMLButtonElement = fixture.debugElement.query(By.css('#editIconBtn')).nativeElement;

        spyOn(component.sendFieldData, 'emit');

        fixture.detectChanges();

        editButton.click();

        expect(component.sendFieldData.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit delete event', () => {
        const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('#deleteIconBtn')).nativeElement;

        spyOn(component.deleteField, 'emit');

        fixture.detectChanges();

        deleteButton.click();

        expect(component.deleteField.emit).toHaveBeenCalledWith(true);
    });

    function getLabelText(): string {
        return (fixture.debugElement.query(By.css('.form-card__header-text')).nativeElement as HTMLElement).textContent;
    }
});
