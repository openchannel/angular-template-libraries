import { cloneDeep, forIn } from 'lodash';
import { TypeMapperUtils } from './type-mapper.util';
import { AppFormField, AppFormModel } from '@openchannel/angular-common-components/src/lib/form-components';

export class TypeMergeUtils {
    static mergeTypes(
        beforeType: AppFormModel | null,
        oldData: any | null,
        secondType: AppFormModel,
        secondPrefix: string,
        secondIncludeFields: string[],
    ): AppFormModel {
        const secondTypeWithDefaultValues = TypeMapperUtils.createFormConfig(secondType, oldData);
        const secondRequiredFields = secondTypeWithDefaultValues?.fields.filter(secondField =>
            secondIncludeFields.includes(secondField.id),
        );
        const secondRequiredFieldsWithPrefix = this.insertCustomPrefixIntoFieldId(secondRequiredFields, secondPrefix);

        return {
            fields: beforeType?.fields ? [...beforeType.fields, ...secondRequiredFieldsWithPrefix] : secondRequiredFieldsWithPrefix,
        };
    }

    static findFieldsWithCustomPrefixes(formResult: any, prefixes?: string[]): any {
        let result = {};
        if (formResult) {
            prefixes.forEach(prefix => {
                result = { ...result, ...this.removeCustomPrefixFromFieldId(formResult, prefix) };
            });
        }
        return TypeMapperUtils.buildDataForSaving(result);
    }

    static findFieldsWithoutCustomPrefixes(formResult: any, prefixes?: string[]): any {
        let result = {};
        if (formResult) {
            result = { ...this.getFieldsWithoutPrefix(formResult, prefixes) };
        }
        return TypeMapperUtils.buildDataForSaving(result);
    }

    static mergeDataAfterChanges(oldData: { customData?: any }, newData: { customData?: any }): any {
        return {
            ...(oldData ? oldData : {}),
            ...(newData ? newData : {}),
            customData: {
                ...(oldData?.customData ? oldData?.customData : {}),
                ...(newData?.customData ? newData?.customData : {}),
            },
        };
    }

    private static insertCustomPrefixIntoFieldId<T extends AppFormField>(fields: T[], prefix: string): T[] {
        if (fields) {
            const clonedFields: T[] = cloneDeep(fields);
            clonedFields.forEach(field => {
                field.id = field.id.startsWith('customData.')
                    ? field.id.replace('customData.', `customData.${prefix}`)
                    : `${prefix}${field.id}`;
            });
            return clonedFields;
        }
        return fields;
    }

    private static removeCustomPrefixFromFieldId(formResult: any, prefix: string): any {
        const result = {};
        forIn(formResult, (value, key) => {
            const isWithPrefix = key.includes(prefix);

            if (isWithPrefix) {
                result[key.replace(prefix, '')] = value;
            }

            if (key === 'customData') {
                result[key] = this.removeCustomPrefixFromFieldId(value, prefix);
            }
        });
        return result;
    }

    private static getFieldsWithoutPrefix(formResult: any, prefixes?: string[]): any {
        const result = {};
        forIn(formResult, (value, key) => {
            const isWithoutPrefix = !prefixes.some(prefix => key.includes(prefix));

            if (isWithoutPrefix) {
                result[key] = value;
            }

            if (key === 'customData') {
                result[key] = this.getFieldsWithoutPrefix(value, prefixes);
            }
        });
        return result;
    }
}
