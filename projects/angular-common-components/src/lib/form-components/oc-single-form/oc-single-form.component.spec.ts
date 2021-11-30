import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcSingleFormComponent } from './oc-single-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
    MockButtonComponent,
    MockCheckboxComponent,
    MockColorComponent,
    MockDateTimeComponent,
    MockDropdownMultiApp,
    MockDynamicFieldArrayComponent,
    MockErrorComponent,
    MockFileUploadComponent,
    MockInputComponent,
    MockMultiSelectCheckboxList,
    MockMultiSelectComponent,
    MockNumberComponent,
    MockPasswordComponent,
    MockRadioButtonListComponent,
    MockRichEditorComponent,
    MockSelectComponent,
    MockTagsComponent,
    MockTextareaComponent,
    MockTooltipComponent,
    MockVideoUrlComponent,
    MockDropdownFormComponent,
    MockAdditionalSelectComponent,
} from '@openchannel/angular-common-components/src/mock/mock';
import { ArraySearchPipe } from '@openchannel/angular-common-components/src/public-api';

describe('OcFormComponent', () => {
    let component: OcSingleFormComponent;
    let fixture: ComponentFixture<OcSingleFormComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcSingleFormComponent,
                    MockTooltipComponent,
                    MockRichEditorComponent,
                    MockTextareaComponent,
                    MockSelectComponent,
                    MockTagsComponent,
                    MockFileUploadComponent,
                    MockNumberComponent,
                    MockCheckboxComponent,
                    MockColorComponent,
                    MockVideoUrlComponent,
                    MockDateTimeComponent,
                    MockMultiSelectComponent,
                    MockDynamicFieldArrayComponent,
                    MockErrorComponent,
                    MockButtonComponent,
                    MockInputComponent,
                    MockPasswordComponent,
                    MockRadioButtonListComponent,
                    MockMultiSelectCheckboxList,
                    MockDropdownMultiApp,
                    MockDropdownFormComponent,
                    MockAdditionalSelectComponent,
                    ArraySearchPipe,
                ],
                imports: [FormsModule, ReactiveFormsModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcSingleFormComponent);
        component = fixture.componentInstance;
        component.formJsonData = {
            formId: '332323rfdf22323',
            name: 'test-form',
            fields: [
                {
                    id: 'name',
                    label: 'name',
                    description: 'test',
                    defaultValue: null,
                    type: 'text',
                    attributes: {
                        maxChars: 20,
                        required: true,
                        minChars: 10,
                    },
                    options: null,
                    fields: null,
                },
                {
                    id: 'role',
                    label: 'role',
                    description: '',
                    defaultValue: 'user',
                    type: 'dropdownList',
                    attributes: { required: true },
                    options: ['admin', 'user', 'test'],
                    fields: null,
                },
                {
                    id: 'aboutme',
                    label: 'About Me',
                    description: '',
                    defaultValue: null,
                    type: 'richText',
                    attributes: {
                        maxChars: 150,
                        required: null,
                        minChars: 10,
                    },
                    options: null,
                    fields: null,
                },
                {
                    id: 'skills',
                    label: 'skills',
                    description: 'skills',
                    defaultValue: ['angular'],
                    type: 'tags',
                    attributes: {
                        minCount: 1,
                        maxCount: 5,
                        required: true,
                    },
                    options: null,
                    fields: null,
                },
                {
                    attributes: {
                        max: 25,
                        min: 5,
                        required: null,
                    },
                    defaultValue: null,
                    description: '',
                    id: 'test-number',
                    label: 'Test number',
                    placeholder: null,
                    type: 'number',
                },
                {
                    attributes: {
                        required: true,
                    },
                    category: 'CUSTOM',
                    defaultValue: true,
                    description: '',
                    id: 'test-checkbox',
                    label: 'Test Checkbox',
                    placeholder: null,
                    type: 'checkbox',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: null,
                    description: '',
                    id: 'test-email',
                    label: 'Test email',
                    placeholder: 'enter email',
                    type: 'emailAddress',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: null,
                    description: null,
                    id: 'test-url-component',
                    label: 'Test URL component',
                    placeholder: 'Enter your link here..',
                    type: 'websiteUrl',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: null,
                    description: null,
                    id: 'test-color-component',
                    label: 'Test Color Component',
                    placeholder: 'Choose your color',
                    type: 'color',
                },
                {
                    attributes: {
                        required: true,
                        maxCount: null,
                        minCount: null,
                    },
                    options: ['true', 'false'],
                    defaultValue: null,
                    description: null,
                    id: 'test-boolean-tags',
                    label: 'Test Boolean tags',
                    placeholder: null,
                    type: 'booleanTags',
                },
                {
                    attributes: {
                        required: true,
                        maxCount: 2,
                        minCount: 1,
                    },
                    options: ['1', '3', '45'],
                    category: 'CUSTOM',
                    defaultValue: [],
                    description: null,
                    id: 'test-number-tags',
                    label: 'Test number tags',
                    placeholder: null,
                    type: 'numberTags',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: null,
                    description: null,
                    id: 'test-date-picker',
                    label: 'Test Date picker',
                    placeholder: null,
                    type: 'date',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: 1602489693553,
                    description: null,
                    id: 'test-datetime-picker',
                    label: 'Test date-time picker',
                    placeholder: null,
                    type: 'datetime',
                },
                {
                    attributes: {
                        required: true,
                    },
                    defaultValue: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
                    description: null,
                    id: 'test-video-url-comp',
                    label: 'Test videoUrl component',
                    placeholder: null,
                    type: 'videoUrl',
                },
                {
                    attributes: {
                        required: true,
                        maxCount: 3,
                        minCount: 2,
                    },
                    options: ['One', 'Two', 'Three', 'Five'],
                    category: 'CUSTOM',
                    defaultValue: [],
                    description: null,
                    id: 'multi-select-test',
                    label: 'Multi Select test',
                    placeholder: null,
                    type: 'multiselectList',
                },
                {
                    attributes: {
                        required: true,
                        maxCount: 1,
                        minCount: null,
                    },
                    options: ['One', 'Two', 'Three', 'Five'],
                    category: 'CUSTOM',
                    defaultValue: [],
                    description: null,
                    id: 'multi-select-test2',
                    label: 'Multi Select test',
                    placeholder: null,
                    type: 'multiselectList',
                },
                {
                    attributes: {
                        maxCount: 3,
                        minCount: 1,
                        ordering: 'append',
                        required: true,
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
                },
            ],
        };
    });

    it('should create', () => {
        jest.spyOn(component.createdForm, 'emit');
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(component.createdForm.emit).toHaveBeenCalledTimes(1);
    });

    it('should hide buttons', () => {
        component.showButton = false;

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button'));

        expect(button).toBeNull();
    });

    it('should show text on button', () => {
        component.successButtonText = 'Text Button';
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('oc-button')).componentInstance;

        expect(button.text).toEqual('Text Button');
    });

    it('should set form dirty', () => {
        component.setFormDirty = true;

        fixture.detectChanges();

        const testControl = (Object as any).values(component.customForm.controls)[0];

        expect(testControl.touched).toEqual(true);
        expect(component.customForm.dirty).toEqual(true);
    });

    it('should show count validation errors', () => {
        component.formJsonData.fields.push({
            attributes: {
                required: true,
                maxCount: 3,
                minCount: 2,
            },
            options: ['1', '3', '45'],
            category: 'CUSTOM',
            defaultValue: [],
            description: null,
            id: 'test-number-tags3',
            label: 'Test number tags',
            placeholder: null,
            type: 'numberTags',
        });
        fixture.detectChanges();
        const invalidControl = component.customForm.get('test-number-tags3');

        invalidControl.setValue([1, 3, 5, 6]);
        fixture.detectChanges();

        expect(invalidControl.hasError('maxElementsCount')).toEqual(true);

        invalidControl.setValue([1]);
        fixture.detectChanges();

        expect(invalidControl.hasError('minElementsCount')).toEqual(true);
    });

    it('should show url validation error', () => {
        fixture.detectChanges();

        const invalidControlEmail = component.customForm.get('test-url-component');

        invalidControlEmail.setValue('mysite');
        fixture.detectChanges();

        expect(invalidControlEmail.hasError('websiteValidator')).toEqual(true);
    });

    it('should show color validation error', () => {
        fixture.detectChanges();

        const invalidControlColor = component.customForm.get('test-color-component');

        invalidControlColor.setValue('333');
        fixture.detectChanges();

        expect(invalidControlColor.hasError('colorValidator')).toEqual(true);
    });

    it('should send data', () => {
        jest.spyOn(component.formDataUpdated, 'emit');
        component.showButton = true;
        fixture.detectChanges();

        const submitButton = fixture.debugElement.query(By.css('#successBtn')).nativeElement;

        submitButton.click();

        expect(component.formDataUpdated.emit).toHaveBeenCalledTimes(1);
    });
});
