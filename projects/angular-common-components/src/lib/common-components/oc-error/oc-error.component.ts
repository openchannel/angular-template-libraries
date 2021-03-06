import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormArray, NgModel, ValidationErrors } from '@angular/forms';
import { OcErrorService } from './oc-error-service';
import { AbstractErrorMessageConfiguration } from '../model/oc-error.model';
import { ControlUtils } from '../model/utils.model';
import { toPath, isEqual } from 'lodash';

/**
 * An oc-error component. It is used to show error or errors list after validation.<br>
 * Each error contains a text message.<br>
 * You can provide {@link DefaultErrorMessageConfiguration}
 * message configs for creating some error messages.
 */
@Component({
    selector: 'oc-error',
    templateUrl: './oc-error.component.html',
    styleUrls: ['./oc-error.component.css'],
})
export class OcErrorComponent implements OnInit {
    /**
     * An input for a specific control, to which an error would be related.
     * @type {AbstractControlDirective | AbstractControl | NgModel}.
     */
    @Input() control: AbstractControlDirective | AbstractControl | NgModel;
    /**
     * Server error field name.
     * @type {string}.
     */
    @Input() field: string;
    /**
     * Params for server error message.
     * @type {*}.
     */
    @Input() errorParams: any;

    /**
     * Modifying an error component to have a custom validator and text message.
     * @type {Object[]}.
     */
    @Input() modifyErrors: [{ validator: string; message: string }];

    /** Current form ID. Used for modifying error messages. Look:  {@link ErrorMessageFormId} */
    @Input() formId: string = null;
    /**
     * Path from control to parent form.
     */
    private fullControlPath: string;
    private pathSegments: string[];
    constructor(public errorService: OcErrorService, private config: AbstractErrorMessageConfiguration) {}

    ngOnInit(): void {
        this.fullControlPath = ControlUtils.getFullControlPath(this.control);
        this.pathSegments = toPath(this.fullControlPath);
        if (this.control && this.control instanceof AbstractControl) {
            const parent = ControlUtils.getParentControl(this.control);
            if (parent instanceof FormArray) {
                // removing first part of the path, it is part of form array.
                this.pathSegments = this.pathSegments.slice(1);
                this.fullControlPath = this.pathSegments.join('.');
            }
        }
    }

    /**
     * This function defines whether to show or not validation errors.
     * Checks for client-side and server-side errors.
     * Creates an error validation object and passes it to a related control.
     * Returns a boolean type.
     */
    shouldShowErrors(): boolean {
        // client side error validators check
        if (this.control && this.control.errors && (this.control.dirty || this.control.touched)) {
            return true;
        }
        // server side error validators check
        if (
            this.errorService.serverErrorList &&
            this.errorService.serverErrorList.length &&
            typeof this.errorService.serverErrorList === 'object'
        ) {
            const error = this.errorService.serverErrorList.find(message => isEqual(toPath(message.field), this.pathSegments));
            if (error) {
                setTimeout(() => {
                    // clear error from service as we have fetched it
                    this.errorService.clearError(error);
                    // create error validation object an pass it to control
                    const errors = { serverErrorValidator: error };
                    if (this.control instanceof AbstractControlDirective) {
                        (this.control as AbstractControlDirective).control.setErrors(errors);
                        (this.control as AbstractControlDirective).control.markAsTouched();
                    } else if (this.control instanceof NgModel) {
                        (this.control as NgModel).control.setErrors(errors);
                        (this.control as NgModel).control.markAsTouched();
                    } else if (this.control) {
                        this.control.setErrors(errors);
                        this.control.markAsTouched();
                    }
                });
                return true;
            }
        }
        if (this.field === 'customError' && this.errorParams) {
            return true;
        }
        // no error
        return false;
    }

    /**
     * Returns an array of errors.
     * @type {string[]}.
     */
    listOfErrors(): string[] {
        const { errors } = this.control;
        if (this.control) {
            if (!errors) {
                return [];
            }
            return Object.keys(errors)
                .map(field => this.getMessage(errors, field, errors[field]))
                .filter(message => message);
        } else if (this.field) {
            const fieldErrorMsg = this.getMessage(null, this.field, this.errorParams);
            return fieldErrorMsg ? [fieldErrorMsg] : [];
        }
        return [];
    }

    /**
     * Finds a message with specific type and params.
     */
    private getMessage(errors: ValidationErrors | null, type: string, params: any): any {
        // old override message implementation
        if (this.modifyErrors) {
            const errorMsg = this.modifyErrors.filter(update => update.validator === type)[0];
            if (errorMsg) {
                // clean up an error message
                return errorMsg?.message;
            }
        }

        let messageFn;
        if (errors?.serverErrorValidator) {
            const serverErrorCode = errors?.serverErrorValidator?.code || errors?.serverErrorValidator?.type || 'defaultMessageHandler';
            // server error message
            messageFn =
                this.getErrorMessageFunction(serverErrorCode, 'serverValidators') ||
                this.getErrorMessageFunction('defaultMessageHandler', 'serverValidators');
        } else {
            // field server error message
            messageFn = this.getErrorMessageFunction(type, 'fieldValidators');
        }

        return messageFn?.(params) || null;
    }

    /**
     * Used for getting error message by specific error key.
     */
    private getErrorMessageFunction(validatorId: string, validatorType: 'fieldValidators' | 'serverValidators'): (params: any) => string {
        if (this.formId && this.config.specificFormValidators[this.formId]) {
            const specificFieldFn =
                this.config.specificFormValidators[this.formId].specificFields?.[this.fullControlPath]?.[validatorType]?.[validatorId];
            if (specificFieldFn) {
                return specificFieldFn;
            }
            const specificFn = this.config.specificFormValidators[this.formId][validatorType]?.[validatorId];
            if (specificFn) {
                return specificFn;
            }
        }
        return this.config[validatorType]?.[validatorId];
    }
}
