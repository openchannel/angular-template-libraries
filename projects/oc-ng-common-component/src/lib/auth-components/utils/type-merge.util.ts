import { cloneDeep, forIn } from 'lodash';
import { TypeFieldModel, TypeModel } from '../models/oc-type-definition.model';
import { TypeMapperUtils } from './type-mapper.util';

export class TypeMergeUtils {
    static mergeTypes<T extends TypeFieldModel>(
        beforeType: TypeModel<T> | null,
        oldData: any | null,
        secondType: TypeModel<T>,
        secondPrefix: string,
        secondIncludeFields: string[],
    ): TypeModel<T> {
        const secondTypeWithDefaultValues = TypeMapperUtils.createFormConfig(secondType, oldData);
        const secondRequiredFields = secondTypeWithDefaultValues?.fields.filter(secondField =>
            secondIncludeFields.includes(secondField.id),
        );
        const secondRequiredFieldsWithPrefix = this.insertCustomPrefixIntoFieldId(secondRequiredFields, secondPrefix);

        return {
            fields: beforeType?.fields ? [...beforeType.fields, ...secondRequiredFieldsWithPrefix] : secondRequiredFieldsWithPrefix,
        };
    }

    static findFieldsWithCustomPrefixes(formResult: any, prefixes?: string[]) {
        const result = {};
        if (formResult) {
            forIn(prefixes, prefix => {
                const marker = `customData.${prefix}`;
                forIn(formResult, (value, key) => {
                    if (key.startsWith(marker)) {
                        result[key.replace(marker, 'customData.')] = value;
                    } else if (key.startsWith(prefix)) {
                        result[key.substring(prefix.length)] = value;
                    }
                });
            });
        }
        return TypeMapperUtils.buildDataForSaving(result);
    }

    static findFieldsWithoutCustomPrefixes(formResult: any, prefixes?: string[]) {
        const result = {};
        if (formResult) {
            forIn(formResult, (value, key) => {
                let requireField = true;
                forIn(prefixes, prefix => {
                    const marker = `customData.${prefix}`;
                    requireField = requireField && !(key.startsWith(marker) || key.startsWith(prefix));
                });
                if (requireField) {
                    result[key] = value;
                }
            });
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

    private static insertCustomPrefixIntoFieldId<T extends TypeFieldModel>(fields: T[], prefix: string): T[] {
        if (fields) {
            const clonedFields: T[] = cloneDeep(fields);
            clonedFields.forEach(field => {
                if (field.id.startsWith('customData.')) {
                    field.id = field.id.replace('customData.', `customData.${prefix}`);
                } else {
                    field.id = `${prefix}${field.id}`;
                }
            });
            return clonedFields;
        }
        return fields;
    }
}
