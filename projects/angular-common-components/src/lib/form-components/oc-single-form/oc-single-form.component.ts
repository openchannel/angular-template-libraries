import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { OcFormGenerator } from '../oc-form/oc-form-generator';
import { AppFormModel } from '../model/app-form-model';
import { ControlUtils, ErrorMessageFormId, OcErrorService } from '@openchannel/angular-common-components/src/lib/common-components';
import { forIn, set, toPath } from 'lodash';
import { map, takeUntil } from 'rxjs/operators';

/**
 * Form component. Represents form builder from given config with customization.
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
 *                            fields: [{
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
    selector: 'oc-single-form',
    templateUrl: './oc-single-form.component.html',
    styleUrls: ['./oc-single-form.component.css'],
})
export class OcSingleFormComponent implements OnInit, OnDestroy, OnChanges {
    /**
     * JSON with all form data to generate dynamic form
     */
    @Input() formJsonData: AppFormModel;

    /**
     * Set disable for button
     * when siblings form is invalid
     */
    @Input() anotherInvalidResult = false;

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
    @Input() buttonPosition: 'center' | 'left' | 'right' = 'left';

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
     * Set form "dirty" after form init
     */
    @Input() setFormDirty: boolean = false;

    /**
     * Submitting process. `true` option will lock for
     *  click and start the spinner in the submit button
     */
    @Input() process: boolean = false;

    /**
     * Flag to show group heading
     */
    @Input() showGroupHeading: boolean = true;

    /**
     * Already generated Form Group
     */
    @Input() generatedForm: FormGroup;

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    @Input() formId: ErrorMessageFormId = null;

    /**
     * Returning all form fields value to the parent component
     */
    @Output() readonly formSubmitted = new EventEmitter<any>();

    /** Sending true when user cancel form submitting */
    @Output() readonly cancelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** When need to get data of the form without buttons */
    @Output() readonly formDataUpdated: EventEmitter<any> = new EventEmitter<any>();

    /** Send form valid status */
    @Output() readonly isFormInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Emit created form */
    @Output() readonly createdForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    /** Main form group */
    customForm: FormGroup;

    /** Result data from form for submission */
    formData: any;

    private destroy$ = {
        updateFormEvent: new Subject<void>(),
        serverErrorEvent: new Subject<void>(),
    };

    private serverErrorIntoDFA: { [dfaControlName: string]: { controlPath: string[] } } = {};

    constructor(private errorService: OcErrorService) {}

    ngOnInit(): void {
        this.generateForm();
        this.listenServerErrors();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.formJsonData && changes.formJsonData.previousValue !== changes.formJsonData.currentValue) {
            this.generateForm();
        }
    }

    ngOnDestroy(): void {
        Object.values(this.destroy$).forEach(destroy => {
            destroy.next();
            destroy.complete();
        });
    }

    /**
     * Generating form by JSON data
     */
    generateForm(): void {
        if (this.generatedForm) {
            this.customForm = this.generatedForm;
        } else if (this.formJsonData.fields) {
            this.customForm = new FormGroup(OcFormGenerator.getFormByConfig(this.formJsonData.fields));
        }
        if (this.setFormDirty) {
            this.setDirty();
        }
        this.initDFAPathsByControl();
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
            let formData: any = {};
            forIn(this.customForm.getRawValue() || {}, (value, key) => (formData = set(formData, key, value)));

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

        this.customForm.valueChanges.pipe(takeUntil(this.destroy$.updateFormEvent)).subscribe(() => {
            this.isFormInvalid.emit(this.customForm.invalid);
            this.sendData();
        });
    }

    /**
     * Callback function for trackBy logic
     */
    trackByFieldId(index: number, formElement: any): string {
        return `${formElement.id}`;
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

    private listenServerErrors(): void {
        this.errorService.serverErrorEvent
            .pipe(
                map(() => this.errorService.serverErrorList || []),
                takeUntil(this.destroy$.serverErrorEvent),
            )
            .subscribe(errors => this.updateDFAErrors(errors));
    }

    private updateDFAErrors(errors: any[]): void {
        for (const controlName of Object.keys(this.serverErrorIntoDFA)) {
            const hasDfaError = this.hasDfaError(errors, this.serverErrorIntoDFA[controlName].controlPath);

            const dfaControl = this.customForm.controls[controlName];

            if (hasDfaError) {
                // set new DFA error
                dfaControl.setErrors({
                    ...(dfaControl.errors || {}),
                    ...OcFormGenerator.createChildDfaFieldError(this.formJsonData?.fields?.find(field => field.id === controlName)),
                });
            } else if (dfaControl.errors?.invalidDFAField && dfaControl.valid) {
                // remove DFA error only when: DFA without server and field errors.
                const newErrors = { ...dfaControl.errors };
                delete newErrors.invalidDFAField;
                dfaControl.setErrors(newErrors);
            }
        }
    }

    private initDFAPathsByControl(): void {
        this.serverErrorIntoDFA = {};
        if (this.formJsonData?.fields) {
            this.formJsonData.fields.forEach(field => {
                if (field && field.id && field.type === 'dynamicFieldArray') {
                    this.serverErrorIntoDFA[field.id] = {
                        controlPath: toPath(ControlUtils.getFullControlPath(this.customForm.controls[field.id])),
                    };
                }
            });
        }
    }

    private hasDfaError(errors: any[], dfaPath: string[]): boolean {
        return !!errors.find(error => {
            const errorPath = toPath(error?.field || '');
            return dfaPath.filter((path, i) => path !== errorPath[i]).length === 0;
        });
    }
}
