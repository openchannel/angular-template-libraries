import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OcFormComponent } from './oc-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
    MockButtonComponent,
    MockProgressbarComponent,
    MockSingleFormComponent,
    MockTooltipComponent
} from '@openchannel/angular-common-components/src/mock/mock';

describe('OcFormComponent', () => {
    let component: OcFormComponent;
    let fixture: ComponentFixture<OcFormComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    OcFormComponent,
                    MockSingleFormComponent,
                    MockButtonComponent,
                    MockTooltipComponent,
                    MockSingleFormComponent,
                    MockProgressbarComponent,
                ],
                imports: [FormsModule, ReactiveFormsModule],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcFormComponent);
        component = fixture.componentInstance;
        component.formJsonData = {
            formId: 'dfa-field',
            name: 'Wizard App Type',
            createdDate: 1612460763356,
            fields: [
                {
                    id: 'name',
                    label: 'Name',
                    type: 'text',
                    attributes: { maxChars: null, required: true, minChars: null },
                },
                {
                    id: 'customData.description',
                    label: 'description',
                    type: 'richText',
                    attributes: { maxChars: null, required: null, minChars: null, group: '' },
                },
                {
                    id: 'customData.contact-information',
                    label: 'Contact information',
                    description: '',
                    type: 'fieldGroup',
                    attributes: {},
                },
                {
                    id: 'customData.contact-1',
                    label: 'contact 1',
                    description: '',
                    type: 'text',
                    attributes: { maxChars: null, required: true, minChars: null, group: 'contact-information' },
                },
                {
                    id: 'customData.contact-2',
                    label: 'contact 2',
                    description: '',
                    type: 'longText',
                    attributes: { maxChars: null, required: true, minChars: null, group: 'contact-information' },
                },
                {
                    id: 'customData.images',
                    label: 'Images',
                    description: '',
                    type: 'fieldGroup',
                    attributes: {},
                },
                {
                    id: 'customData.images-1',
                    label: 'Images 1',
                    description: '',
                    type: 'singleImage',
                    attributes: { width: null, required: true, hash: null, accept: null, height: null, group: 'images' },
                },
                {
                    id: 'customData.images-2',
                    label: 'Images 2',
                    description: '',
                    type: 'singleFile',
                    attributes: { required: true, hash: null, accept: null, group: 'images' },
                },
                {
                    id: 'customData.personal-data',
                    label: 'Personal Data',
                    description: '',
                    type: 'fieldGroup',
                    attributes: {},
                },
                {
                    id: 'customData.personal-1',
                    label: 'Personal 1',
                    description: '',
                    type: 'color',
                    attributes: { required: null, group: 'personal-data' },
                },
                {
                    id: 'customData.personal-2',
                    label: 'Personal 2',
                    description: '',
                    type: 'emailAddress',
                    attributes: { required: true, group: 'personal-data' },
                },
                {
                    id: 'customData.personal-3',
                    label: 'Personal 3',
                    description: '',
                    type: 'richText',
                    attributes: { maxChars: null, required: true, minChars: null, group: 'personal-data' },
                },
                {
                    id: 'customData.general-test-field',
                    label: 'General test field',
                    description: '',
                    defaultValue: [],
                    type: 'tags',
                    attributes: { minCount: null, maxCount: null, required: true, group: '' },
                },
            ],
        };
    });

    it('should create', () => {
        component.displayType = 'wizard';
        spyOn(component.createdForm, 'emit');
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

        const button = fixture.debugElement.queryAll(By.css('oc-button'))[1].componentInstance;

        expect(button.text).toEqual('Text Button');
    });
});
