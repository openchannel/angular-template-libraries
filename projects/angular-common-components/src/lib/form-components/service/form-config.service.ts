import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { merge } from 'lodash';
import { FormLabelPosition } from '../model/app-form-model';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';

export const OC_FORM_CONFIG = new InjectionToken<string>('Form config');

export type FormId = 'default' | 'createApp' | string;

export interface FormInputs {
    longText: {
        rows?: number;
        [key: string]: any;
    };

    richText: {
        config?: any;
        [key: string]: any;
    };

    label: {
        position?: FormLabelPosition;
        tooltipPosition?: PlacementArray;
        [key: string]: any;
    };

    [key: string]: any;
}

export type FormConfig = {
    [formId in FormId]: Partial<FormInputs>;
};

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
