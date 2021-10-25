import { GetTextByPathPipe } from '@openchannel/angular-common-components/src/lib/common-components/pipe/get-text-by-path.pipe';

describe('GetTextByPathPipe', () => {
    let pipe: GetTextByPathPipe;
    let value: any;

    beforeEach(() => {
        pipe = new GetTextByPathPipe();
        value = {
            textField: 'text-value',
            textFieldWithHtmlTags: '<a>text-value-with-tags</a>',
            emptyTextField: '',
            numberField: 0,
            objectField: {
                textField: 'text-value-from-object-field',
            },
            emptyObjectField: null,
        };
    });

    it('Get text value by path', () => {
        expect(pipe.transform(value, 'textField')).toBe('text-value');
    });

    it('Get text value by multi field path.', () => {
        expect(pipe.transform(value, 'objectField.textField', 'default-value')).toBe('text-value-from-object-field');
    });

    it('Get number value by path. Convert to string.', () => {
        expect(pipe.transform(value, 'numberField')).toBe('0');
    });
    it('Replace HTML tags.', () => {
        expect(pipe.transform(value, 'textFieldWithHtmlTags')).toBe('text-value-with-tags');
    });
    it('Without HTML tag replacing.', () => {
        expect(pipe.transform(value, 'textFieldWithHtmlTags', '', false)).toBe('<a>text-value-with-tags</a>');
    });
    it('Use default value, when value by path is empty or null.', () => {
        expect(pipe.transform(value, 'emptyTextField', 'default-value')).toBe('default-value');
    });
    it('Use default value, when value by path is not text.', () => {
        expect(pipe.transform(value, 'objectField', 'default-value')).toBe('default-value');
    });
});
