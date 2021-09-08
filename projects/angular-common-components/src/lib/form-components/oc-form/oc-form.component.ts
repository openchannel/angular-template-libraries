import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { AppFormField, AppFormModel } from '../model/app-form-model';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export interface FieldStep {
    label?: AppFormField;
    items?: AppFormField[];
}

export type FormType = 'wizard' | 'page';

class OcFormGroup extends FormGroup {
    label: AppFormField;
    formConfig: AppFormModel = {
        fields: [],
    };

    constructor(label: AppFormField, formConfig: AppFormField[], controls: { [p: string]: AbstractControl }) {
        super(controls);
        this.label = label;
        this.formConfig.fields = [...formConfig];
    }
}

@Component({
    selector: 'oc-form',
    templateUrl: './oc-form.component.html',
    styleUrls: ['./oc-form.component.css'],
})
export class OcFormComponent implements OnInit, OnChanges {
    /**
     * JSON with all form data to generate dynamic form
     */
    @Input() formJsonData: AppFormModel;

    /**
     * Show button on form.
     * @default true
     */
    @Input() showButton: boolean = true;

    /**
     * Set position of the buttons.
     * Can be: "center", "left", "right".
     * @default 'left'
     */
    @Input() buttonPosition: 'center' | 'left' | 'right' | 'justify' = 'left';

    /**
     * Set custom text to success button.
     * @default 'Submit'
     */
    @Input() successButtonText: string = 'Submit';

    /**
     * Set position of the field label. Can be: "top", "left", "right".
     * @default 'top'
     */
    @Input() labelPosition: 'top' | 'left' | 'right' = 'top';

    /**
     * Submitting process. `true` option will lock for
     *  click and start the spinner in the submit button
     */
    @Input() process: boolean = false;

    /**
     * Already generated Form Group. IMPORTANT! Works only for single page form.
     */
    @Input() generatedForm: FormGroup;

    /**
     * Returning all form fields value to the parent component
     */
    @Output() readonly formSubmitted: EventEmitter<any> = new EventEmitter();

    /** Sending true when user cancel form submitting */
    @Output() readonly cancelSubmit: EventEmitter<void> = new EventEmitter();

    /** When need to get data of the form without buttons */
    @Output() readonly formDataUpdated: EventEmitter<any> = new EventEmitter();

    /**
     * @Deprecated
     * Send form valid status. IMPORTANT! Work only for single page form.
     */
    @Output() readonly isFormInvalid: EventEmitter<boolean> = new EventEmitter();

    /** Emit created form */
    @Output() readonly createdForm: EventEmitter<AbstractControl> = new EventEmitter();

    /** PROPERTIES AND BINDINGS FOR WIZARD FORM */

    /**
     * The form type, can be rendered as 'wizard' or classic 'single' form.
     * If 'wizard' - each step will be a formGroup.
     */
    @Input() displayType: FormType = 'page';

    /** Custom template for the save button to show. */
    @Input() additionalButton: TemplateRef<any>;

    /** Current wizard step */
    @Input() currentStep: number = 1;

    /** Component emits on what step a user is, when he changes the step. */
    @Output() readonly currentStepChange = new EventEmitter<number>();

    /**
     * Submitting process. `true` option will lock for
     *  click and start the spinner in the submit button
     */
    @Input() showSubmitButton: boolean = true;

    /**
     * Flag to show group heading
     */
    @Input() showGroupHeading: boolean = true;

    customForm: FormArray;
    hasFieldGroup: boolean = false;
    resultData: any = {};

    ngOnInit(): void {
        this.checkFormType(this.displayType);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formJsonData && changes.formJsonData.previousValue !== changes.formJsonData.currentValue) {
            this.setStep(1);
            this.checkFormType(this.displayType);
        }
        if (changes.generatedForm && changes.generatedForm.previousValue !== changes.generatedForm.currentValue) {
            this.customForm = new FormArray([this.generatedForm]);
        }
    }

    mapFormFieldsData(fields: any): void {
        this.resultData = {
            ...this.resultData,
            ...fields,
        };
    }

    get currentForm(): OcFormGroup {
        return this.customForm.controls[this.currentStep - 1] as OcFormGroup;
    }

    onSubmitButtonClicked(): void {
        this.customForm.markAllAsTouched();
        if (this.customForm.invalid) {
            for (let i = 0; i < this.customForm.length; i++) {
                const stepForm = this.customForm.controls[i];
                if (stepForm.invalid) {
                    this.setStep(i + 1);
                    return;
                }
            }
        } else {
            this.formSubmitted.emit(this.resultData);
        }
    }

    navigateSteps(direction: string): void {
        direction === 'next' ? this.currentStep++ : this.currentStep--;
        this.currentStepChange.emit(this.currentStep);
    }

    /**
     * Updates and emits form on change
     */
    onFormDataUpdated(fields: any): void {
        this.mapFormFieldsData(fields);
        this.formDataUpdated.emit(this.resultData);
    }

    onFormCreated(form: FormGroup): void {
        this.createdForm.emit(form);
    }

    get isFirstStep(): boolean {
        return this.customForm ? this.currentStep === 1 : true;
    }

    get isLastStep(): boolean {
        return this.customForm ? this.currentStep === this.customForm.length : true;
    }

    get stepLabel(): string {
        return `Step ${this.currentStep}. ${this.currentForm.label ? this.currentForm.label.label : ''}`;
    }

    private setStep(step: number): void {
        this.currentStep = step;
        this.currentStepChange.emit(step);
    }

    private checkFormType(type: FormType): void {
        if (!this.generatedForm) {
            if (type === 'wizard') {
                this.generateStepsForm(this.formJsonData);
                this.hasFieldGroup = this.customForm.controls.length > 1;
            } else {
                this.customForm = null;
                this.hasFieldGroup = false;
            }
        } else {
            this.customForm = new FormArray([this.generatedForm]);
        }
    }

    private generateStepsForm(data: AppFormModel): void {
        const formsArray: FieldStep[] = [];
        const currentFreeFieldsStep: FieldStep = {
            items: [],
        };
        data.fields.forEach((field, index) => {
            if (field.type === 'fieldGroup') {
                if (currentFreeFieldsStep.items.length > 0) {
                    formsArray.push({ ...currentFreeFieldsStep });
                    currentFreeFieldsStep.items = [];
                }
                const step: FieldStep = {
                    label: field,
                    items: data.fields.filter(item => item.attributes?.group === field.id.replace('customData.', '')),
                };
                if (step.items.length) {
                    formsArray.push(step);
                }
            } else {
                if (!field.attributes?.group) {
                    currentFreeFieldsStep.items.push(field);
                    if (index === data.fields.length - 1) {
                        formsArray.push(currentFreeFieldsStep);
                    }
                }
            }
        });
        this.customForm = new FormArray(
            formsArray.map(item => new OcFormGroup(item.label, item.items, OcFormGenerator.getFormByConfig(item.items))),
        );
        this.customForm.controls.forEach(form => {
            this.mapFormFieldsData(form.value);
        });
        this.createdForm.emit(this.customForm);
    }
}
