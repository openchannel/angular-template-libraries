import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OcFormGenerator } from './oc-form-generator';
import { AppFormModel } from '../model/app-form-model';

/**
 * Form component. Represents form builder from given config with customization.
 *
 * Inputs:
 * @param {AppFormModel} formJsonData 
 * @param {boolean} anotherInvalidResult
 * @param {boolean} showButton
 * @param {'center' | 'left' | 'right'} buttonPosition
 * @param {string} successButtonText
 * @param {'top' | 'left' | 'right'} labelPosition
 * @param {boolean} setFormDirty
 * @param {boolean} process
 * @param {FormGroup} generatedForm
 * <br>
 * Outputs:
 * @param {EventEmitter<any>} formSubmitted
 * @param {EventEmitter<boolean>} cancelSubmit
 * @param {EventEmitter<any>} formDataUpdated
 * @param {EventEmitter<boolean>} isFormInvalid
 * @param {EventEmitter<FormGroup>} createdForm
 *
 * @example <oc-form [formJsonData]="{
 *                        formId: "ahs97d8ha897shd87",
 *                        name: "login",
 *                        createdDate: 82736487263,
 *                        fields: [{
 *                            id: '9ahs9d8has9d8h',
 *                            label: 'login',
 *                            description: 'username',
 *                            defaultValue: '',
 *                            type: 'text',
 *                            required: true,
 *                            attributes: {
 *                                maxCount: 1,
 *                                minCount: 1,
 *                                required: 1,
 *                                maxChars: 1,
 *                                minChars: 1,
 *                                min: 1,
 *                                max: 1,
 *                                ordering: 'append',
 *                                rowLabel: 1,
 *                            },
 *                            options: {},
 *                            subFieldDefinitions: [{
 *                               formId: "ahs97d8ha897shd87",
 *                                  ...
 *                            }],
 *                            fields: [{
 *                               formId: "ahs97d8ha897shd87",
 *                                  ...
 *                            }],
 *                            placeholder: 'ENTER',
 *                            category: 'login',
 *                        }]
 *                   }"
 *                   [anotherInvalidResult]="true"
 *                   [showButton]="true"
 *                   [buttonPosition]="'left'"
 *                   [successButtonText]="'Success'"
 *                   [labelPosition]="'right'"
 *                   [setFormDirty]="true"
 *                   [process]="true"
 *                   [generatedForm]="{FormGroup}"
 *                   (formSubmitted)="onFormSubmitted()"
 *                   (cancelSubmit)="onCancelSubmit()"
 *                   (formDataUpdated)="onFormDataUpdated()"
 *                   (isFormInvalid)="onIsFormInvalid()"
 *                   (createdForm)="onCreatedForm()"
 * >
 */
@Component({
    selector: 'oc-form',
    templateUrl: './oc-form.component.html',
    styleUrls: ['./oc-form.component.scss'],
})
export class OcFormComponent implements OnInit, OnDestroy, OnChanges {
    /**
     * JSON with all form data to generate dynamic form
     */
    @Input() formJsonData: AppFormModel;

    /**
     * Set disable for button
     * when siblings form is invalid
     */
    @Input() anotherInvalidResult = false;

    /** Show button on form. Default: true */
    @Input() showButton: boolean = true;

    /**
     * Set position of the buttons
     * can be: 'center', 'left', 'right'.
     * default value: 'left'
     */
    @Input() buttonPosition: 'center' | 'left' | 'right' = 'left';

    /** Set custom text to success button. Default: 'Submit' */
    @Input() successButtonText: string = 'Submit';

    /**
     * Set position of the field label
     * can be: 'top', 'left', 'right'.
     * default value: 'top'
     */
    @Input() labelPosition: 'top' | 'left' | 'right' = 'top';

    /**
     * Set form 'dirty' after form init
     */
    @Input() setFormDirty: boolean = false;

    /**
     * Submitting process. 'true' option will lock for
     *  click and start the spinner in the submit button
     */
    @Input() process: boolean = false;

    /**
     * Already generated Form Group
     */
    @Input() generatedForm: FormGroup;

    /**
     * Returning all form fields value to the parent component
     */
    @Output() formSubmitted = new EventEmitter<any>();

    /** Sending true when user cancel form submitting */
    @Output() cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** When need to get data of the form without buttons */
    @Output() formDataUpdated: EventEmitter<any> = new EventEmitter<any>();

    /** Send form valid status */
    @Output() isFormInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Emit created form */
    @Output() createdForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    /** Main form group */
    customForm: FormGroup;

    /** Result data from form for submission */
    formData: any;

    /** (private) Subscription for a main form */
    private formSubscription: Subscription = new Subscription();

    ngOnInit(): void {
        this.generateForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formJsonData && changes.formJsonData.previousValue !== changes.formJsonData.currentValue) {
            this.generateForm();
        }
    }

    ngOnDestroy(): void {
        if (!this.showButton) {
            this.formSubscription.unsubscribe();
        }
    }

    /**
     * Replace all dots in form json data
     */
    removeJSONDots(): void {
        this.formJsonData.fields.forEach(field => {
            field.id = field.id.replace('.', '/');
        });
    }

    /**
     * Generating form by JSON data
     */
    generateForm(): void {
        if (this.generatedForm) {
            this.customForm = this.generatedForm;
        } else if (this.formJsonData.fields) {
            this.removeJSONDots();
            this.customForm = new FormGroup(OcFormGenerator.getFormByConfig(this.formJsonData.fields));
        }
        if (this.setFormDirty) {
            this.setDirty();
        }
        this.createdForm.emit(this.customForm);
        if (!this.showButton) {
            this.subscribeToForm();
        }
    }

    /**
     * Output event which returns form value
     */
    sendData(): void {
        if (!this.anotherInvalidResult && !this.process) {
            const formData = this.customForm.getRawValue();
            Object.keys(formData).forEach(key => {
                if (key.includes('/')) {
                    formData[key.replace('/', '.')] = formData[key];
                    delete formData[key];
                }
            });
            if (this.customForm.valid && this.showButton) {
                this.formSubmitted.emit(formData);
            } else {
                this.formDataUpdated.emit(formData);
            }
        }
    }

    /**
     * Emit cancel submit
     */
    cancelForm(): void {
        this.cancelSubmit.emit(true);
    }

    /**
     * Listening to value changes of the form if buttons not applied
     */
    subscribeToForm(): void {
        this.isFormInvalid.emit(this.customForm.invalid);
        this.sendData();

        this.formSubscription.add(
            this.customForm.valueChanges.subscribe(() => {
                this.isFormInvalid.emit(this.customForm.invalid);
                this.sendData();
            }),
        );
    }

    /**
     * Callback function for trackBy logic
     */
    trackByFieldId(index: number, formElement: any): string {
        return `${formElement.id}`;
    }

    /**
     * Check if DFA control is invalid and if yes return an error
     * @param {AbstractControl} dfaControl - control to check
     * @param {string} label - label for control
     * @returns `string`
     */
    getDfaError(dfaControl: AbstractControl, label: string): string {
        return dfaControl.touched && dfaControl.invalid ? 'Please, check all fields inside ' + label : '';
    }

    /**
     * Set all controls as touched and dirty
     */
    private setDirty(): void {
        (Object as any).values(this.customForm.controls).forEach(control => {
            control.markAsTouched();
            control.markAsDirty();
        });
    }
}
