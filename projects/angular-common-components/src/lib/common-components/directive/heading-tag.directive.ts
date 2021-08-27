import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { HeadingTag } from '../interfaces/heading-tag.interface';

@Directive({
    selector: '[headingTag]',
})
export class HeadingTagDirective implements OnChanges {

    @Input() headingTag: HeadingTag;

    @Input() set headingTagContent(content: string) {
        this._headingTagContent = content;
        this._staticContent = false;
    }

    private _staticContent = true;
    private _headingTagContent;
    private _oldHtmlElement: HTMLHeadingElement = null;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        const currentHtmlTag: HTMLHeadingElement = this._oldHtmlElement || this.el.nativeElement;

        if (
            (changes.headingTag && changes.headingTag.currentValue !== currentHtmlTag.localName) ||
            (!this._staticContent && this._headingTagContent !== currentHtmlTag.innerText)
        ) {
            this.modifyHtmlTag(currentHtmlTag);
        }
    }

    modifyHtmlTag(currentHtmlTag: HTMLHeadingElement): void {
        // Get parent of the original heading tag
        const parent = currentHtmlTag.parentNode;
        // Create new heading tag
        const newHeadingTag = this.renderer.createElement(this.headingTag);
        // update text
        this.renderer.appendChild(newHeadingTag, this.renderer.createText(this._headingTagContent || currentHtmlTag.innerText));
        // copy classes
        (currentHtmlTag.className.split(' ') || []).forEach(oldClass => this.renderer.addClass(newHeadingTag, oldClass));
        // Add new heading tag, just before the input
        this.renderer.insertBefore(parent, newHeadingTag, currentHtmlTag);
        // Remove the old heading tag
        this.renderer.removeChild(parent, currentHtmlTag);
        this._oldHtmlElement = newHeadingTag;
    }
}
