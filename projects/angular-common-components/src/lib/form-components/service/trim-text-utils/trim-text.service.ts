import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';
import { cloneDeep, get, set } from 'lodash';
import { TrimFormFieldType } from '../../model/app-form-model';
import { RichTextUtils } from '../rich-text-utils/rich-text.service';

export class TrimTextUtils {
    static trimByType(value: any, fieldType?: TrimFormFieldType): any {
        if (fieldType === 'richText' && typeof value === 'string') {
            return RichTextUtils.trimRichText(value);
        } else if (fieldType === 'password') {
            return value;
        } else {
            return this.trimAll(value);
        }
    }

    static trimTextFields<T extends {} | []>(value: T, fields: AppTypeFieldModel[], trimFields: TrimFormFieldType[]): T {
        return this.trimTextFieldsInternal(cloneDeep(value), fields, fieldType => trimFields?.includes(fieldType));
    }

    private static trimTextFieldsInternal<T>(
        value: T,
        fields: AppTypeFieldModel[],
        needToTrim: (type: TrimFormFieldType, value?: string) => boolean,
    ): T {
        if (!value || !fields || typeof value !== 'object') {
            return value;
        }
        fields.forEach(field => {
            const valueByPath = get(value, field.id);
            if (valueByPath === undefined) {
                return;
            }
            if (field.type === 'dynamicFieldArray' && Array.isArray(valueByPath)) {
                valueByPath.forEach(dfaItem => this.trimTextFieldsInternal(dfaItem, field.fields, needToTrim));
            }
            if (needToTrim(field.type, valueByPath)) {
                set(value as any, field.id, this.trimByType(valueByPath, field.type));
            }
        });
        return value;
    }

    private static trimAll(data: any): any {
        // tslint:disable-next-line:switch-default
        switch (typeof data) {
            case 'string':
                return data.trim();
            case 'object':
                Object.keys(data || []).forEach(key => (data[key] = this.trimAll(data[key])));
        }
        return data;
    }
}
