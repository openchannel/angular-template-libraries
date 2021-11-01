import { RichTextUtils } from './rich-text.service';

describe('RichTextUtils', () => {
    it('Rich text as NULL.', () => {
        expect(RichTextUtils.trimRichText(null)).toBe(null);
    });
    it('Rich text 1', () => {
        expect(RichTextUtils.trimRichText('<a></a>')).toBe('<a></a>');
    });
    it('Rich text 2', () => {
        expect(RichTextUtils.trimRichText('<a>  value</a>')).toBe('<a>value</a>');
    });
    it('Rich text 3', () => {
        expect(RichTextUtils.trimRichText('<a>value  </a>')).toBe('<a>value</a>');
    });
    it('Rich text 4', () => {
        expect(RichTextUtils.trimRichText('<a>  value  </a>')).toBe('<a>value</a>');
    });
    it('Rich text 5', () => {
        expect(RichTextUtils.trimRichText('<a>  <a>value</a>  </a>')).toBe('<a><a>value</a></a>');
    });
    it('Rich text 6', () => {
        expect(RichTextUtils.trimRichText('<a>  <a>  value</a>  </a>')).toBe('<a><a>value</a></a>');
    });
    it('Rich text 7', () => {
        expect(RichTextUtils.trimRichText('<a>  <a>value  </a>  </a>')).toBe('<a><a>value</a></a>');
    });
    it('Rich text 8', () => {
        expect(RichTextUtils.trimRichText('<a>  <a>   value  </a>  </a>')).toBe('<a><a>value</a></a>');
    });
    it('Rich text 9', () => {
        expect(RichTextUtils.trimRichText('<a>  <a>   value  value </a>  </a>')).toBe('<a><a>value  value</a></a>');
    });
});
