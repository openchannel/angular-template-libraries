import { TrimTextUtils } from './trim-text.service';
import { AppFormField, TrimFormFieldType } from '@openchannel/angular-common-components/src/lib/form-components';
import { AppTypeFieldModel } from '@openchannel/angular-common-components/src/lib/common-components';

type SimpleFieldType = {
    textKey: string;
    textNullKey: string;
    richTextKey: string;
    numberKey: number;
    numberNullKey: number;
};

type CustomField<T extends SimpleFieldType> = (Omit<AppFormField, 'label'> & { id: keyof T })[];

describe('TrimTextUtils', () => {
    let trimFields: TrimFormFieldType[];

    beforeEach(() => {
        trimFields = ['text', 'richText'];
    });

    it('Trim simple fields [richText, text]', () => {
        expect(TrimTextUtils.trimTextFields(
            createSimpleData(),
            createSimpleFields() as AppTypeFieldModel[],
            trimFields))
        .toEqual({
            ...createSimpleData(),
            textKey: 'textValue',
            richTextKey: '<a>richTextValue</a>',
        });
    });

    it('Skip simple fields [richText]', () => {
        const newTrimFields = trimFields.filter(f => f !== 'richText');

        expect(TrimTextUtils.trimTextFields(
            createSimpleData(),
            createSimpleFields() as AppTypeFieldModel[],
            newTrimFields))
        .toEqual({
            ...createSimpleData(),
            textKey: 'textValue',
        });
    });

    it('Trim fields into DFA', () => {
        const data = {
            dfaKey: [
                {
                    ...createSimpleData(),
                    dfaNullKey: null,
                    dfaKey: [
                        {
                            ...createSimpleData(),
                        },
                    ],
                },
            ],
        };
        expect(TrimTextUtils.trimTextFields(data, createDfaField(), trimFields)).toEqual({
            dfaKey: [
                {
                    ...createSimpleData(),
                    textKey: 'textValue',
                    richTextKey: '<a>richTextValue</a>',
                    dfaNullKey: null,
                    dfaKey: [
                        {
                            ...createSimpleData(),
                            textKey: 'textValue',
                            richTextKey: '<a>richTextValue</a>',
                        },
                    ],
                },
            ],
        });
    });

    function createDfaField(): any {
        return [
            {
                id: 'dfaKey',
                type: 'dynamicFieldArray',
                fields: [
                    ...createSimpleFields(),
                    {
                        id: 'dfaKey',
                        type: 'dynamicFieldArray',
                        fields: [...createSimpleFields()],
                    },
                    {
                        id: 'dfaNullKey',
                        type: 'dynamicFieldArray',
                        fields: [...createSimpleFields()],
                    },
                ],
            },
        ];
    }

    function createSimpleData(): SimpleFieldType {
        return {
            textKey: '  textValue  ',
            textNullKey: null,
            richTextKey: '<a>  richTextValue </a>',
            numberKey: 123,
            numberNullKey: null,
        };
    }

    function createSimpleFields(): CustomField<SimpleFieldType> {
        return [
            { id: 'numberKey', type: 'number' },
            { id: 'numberNullKey', type: 'number' },
            { id: 'richTextKey', type: 'richText' },
            { id: 'textKey', type: 'text' },
            { id: 'textNullKey', type: 'text' },
        ];
    }
});
