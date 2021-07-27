import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcDynamicFieldArrayComponent } from './oc-dynamic-field-array.component';
import { By } from '@angular/platform-browser';
import { FormArray, FormGroup } from '@angular/forms';
import { OcFormGenerator } from '@openchannel/angular-common-components/src/lib/form-components/oc-form/oc-form-generator';
import {
    MockButtonComponent,
    MockDynamicArrayPreview,
    MockFormComponent,
    MockSvgIconComponent,
} from '@openchannel/angular-common-components/src/mock/mock';

describe('OcDynamicFieldArrayComponent', () => {
    let component: OcDynamicFieldArrayComponent;
    let fixture: ComponentFixture<OcDynamicFieldArrayComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcDynamicFieldArrayComponent,
                    MockButtonComponent,
                    MockSvgIconComponent,
                    MockFormComponent,
                    MockDynamicArrayPreview,
                ],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcDynamicFieldArrayComponent);
        component = fixture.componentInstance;
        component.fieldDefinitionData = {
            attributes: {
                maxCount: null,
                minCount: null,
                ordering: 'append',
                required: null,
                rowLabel: 'field1',
            },
            defaultValue: null,
            description: '',
            id: 'test-dynamic-field-array',
            label: 'Test Dynamic field array',
            placeholder: null,
            fields: [
                {
                    attributes: {
                        maxChars: null,
                        minChars: null,
                        required: null,
                    },
                    defaultValue: null,
                    description: 'some description',
                    id: 'field1',
                    label: 'field1',
                    placeholder: 'write some text',
                    type: 'text',
                },
                {
                    id: 'long-text-example',
                    label: 'Long Text Example',
                    type: 'longText',
                    placeholder: 'Write your text here...',
                    defaultValue: null,
                    attributes: {
                        maxChars: 200,
                        required: null,
                        minChars: 2,
                    },
                },
            ],
            type: 'dynamicFieldArray',
        };
        component.dfaFormArray = new FormArray([]);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should add array item and show form', () => {
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.cards-interface__add-btn')).nativeElement;
        button.click();

        fixture.detectChanges();

        const arrayItem = fixture.debugElement.queryAll(By.css('.cards-interface__added-item'));
        const form = fixture.debugElement.query(By.css('oc-form')).nativeElement;

        expect(component.dfaFormArray.controls.length).toBeGreaterThan(0);
        expect(component.formsArrayConfig.length).toBeGreaterThan(0);
        expect(arrayItem.length).toBeGreaterThan(0);
        expect(form).toBeTruthy();
    });

    it('should throw error', () => {
        fixture.detectChanges();

        expect(() => (component.fieldDefinitionData = undefined)).toThrowError('FieldDefinitionData is required @Input() parameter');
    });

    it('should save items value', () => {
        fixture.detectChanges();

        fixture.debugElement.query(By.css('.cards-interface__add-btn')).nativeElement.click();

        fixture.detectChanges();

        component.dfaFormArray.controls[0].get('field1').setValue('Hello!');
        component.dfaFormArray.controls[0].get('long-text-example').setValue('Long text data');

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.cards-interface__preview-buttons-save')).nativeElement.click();

        expect(component.formsArrayConfig[0].formData).toEqual({
            field1: 'Hello!',
            'long-text-example': 'Long text data',
        });
    });

    it('should delete array item', () => {
        const fields = component.fieldDefinition.fields;
        component.dfaFormArray = new FormArray([new FormGroup(OcFormGenerator.getFormByConfig(fields))]);
        fixture.detectChanges();

        component.deleteDynamicItem(0);

        fixture.detectChanges();

        expect(component.dfaFormArray.length).toEqual(0);
        expect(component.formsArrayConfig.length).toEqual(0);
    });

    it('should cancel adding array item', () => {
        fixture.detectChanges();

        fixture.debugElement.query(By.css('.cards-interface__add-btn')).nativeElement.click();

        fixture.detectChanges();

        fixture.debugElement.query(By.css('.cards-interface__preview-buttons-cancel')).nativeElement.click();

        fixture.detectChanges();

        expect(component.dfaFormArray.length).toEqual(0);
        expect(component.formsArrayConfig.length).toEqual(0);
    });
});
