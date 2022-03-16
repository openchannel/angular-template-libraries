import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { merge } from 'lodash';
import { FormLabelPosition } from '../model/app-form-model';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ImageCropperOptions } from '../oc-file-upload/oc-file-upload.component';

/**
 * Use this injection token to provide custom form config.
 *
 * Provider example to provide custom form config:
 * @example
 *         {
 *           provide: OC_FORM_CONFIG,
 *           useValue: {
 *               createApp: {
 *                   longText: {
 *                       rows: 20,
 *                   },
 *                   label: {
 *                       tooltipPosition: 'top',
 *                   },
 *               },
 *               default: {
 *                   label: {
 *                       tooltipPosition: 'bottom',
 *                   },
 *               },
 *           },
 *       },
 */
export const OC_FORM_CONFIG = new InjectionToken<string>('Custom form config');

/**
 * Id of the form to which you want to apply form inputs config.
 */
export type FormId = 'default' | 'createApp' | string;

/**
 * Form input id with options that you can customize.
 */
export interface FormInputs {
    longText: {
        rows?: number;
        [key: string]: any;
    };

    richText: {
        options?: any;
        [key: string]: any;
    };

    label: {
        position?: FormLabelPosition;
        tooltipPosition?: PlacementArray;
        [key: string]: any;
    };

    multiselect: {
        placeholder: string;
    };

    tags: {
        labelText: string;
    };

    fileUpload: {
        fileUploadButtonText: string;
        imageUploadButtonText: string;
        descriptionText: string;
        imageCropperOptions: ImageCropperOptions;
        [key: string]: any;
    };

    /** Your custom input */
    [key: string]: any;
}

/** Interface for the custom form config */
export type FormConfig = {
    [formId in FormId]: Partial<FormInputs>;
};

/**
 * Injects to the {@link OcSingleFormComponent} to to configure form rows (labels, inputs).
 *
 * Use {@link OC_FORM_CONFIG} injection token to set custom form config.
 */
@Injectable({
    providedIn: 'root',
})
export class FormConfigService {
    private defaultConfig: Partial<FormInputs> = {
        longText: {
            rows: 5,
        },
        label: {
            position: 'top',
            tooltipPosition: 'right',
        },
        multiselect: {
            placeholder: '',
        },
        tags: {
            labelText: 'Close',
        },
        richText: {
            options: {},
        },
        emailAddress: {
            defaultPlaceholder: 'myemail@example.com',
        },
        websiteUrl: {
            defaultPlaceholder: 'https://my.website.com',
        },
        videoUrl: {
            defaultPlaceholder: 'https://my.website.com',
        },
        fileUpload: {
            fileUploadButtonText: 'Browse File',
            imageUploadButtonText: 'Browse File',
            descriptionText: 'Drag & drop file here or',
            imageCropperOptions: {
                headerText: 'Edit Image',
                cancelText: 'Cancel',
                confirmText: 'Confirm',
            },
        },
    };

    config: FormConfig = {};

    constructor(@Optional() @Inject(OC_FORM_CONFIG) private injectedConfig: FormConfig) {
        this.setFormConfig(injectedConfig || {});
    }

    setFormConfig(injectedConfig: FormConfig): void {
        // Set default values to each form config if specific values aren't provided
        Object.keys(injectedConfig).forEach(formId => {
            this.config[formId] = {};
            merge(this.config[formId], this.defaultConfig, injectedConfig[formId]);
        });

        // Add separate default form config if it wasn't set
        if (!this.config.default) {
            this.config.default = this.defaultConfig;
        }
    }
}
