import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {HeadingTag} from "../interfaces/heading-tag.interface";

@Directive({
    selector: '[headingTag]',
})
export class HeadingTagDirective implements AfterViewInit {

    @Input() headingTag: HeadingTag;

    constructor(private renderer: Renderer2, private el: ElementRef) {

    }

    ngAfterViewInit() {
        let originalHeadingTag: HTMLHeadingElement = this.el.nativeElement;

        if (this.headingTag && this.headingTag !== originalHeadingTag.localName) {
            // Get parent of the original heading tag
            const parent = originalHeadingTag.parentNode;

            // Create new heading tag
            let newHeadingTag = this.renderer.createElement(this.headingTag);
            this.renderer.appendChild(newHeadingTag, this.renderer.createText(originalHeadingTag.innerText));
            this.renderer.addClass(newHeadingTag, originalHeadingTag.className);

            // Add new heading tag, just before the input
            this.renderer.insertBefore(parent, newHeadingTag, originalHeadingTag);

            // Remove the old heading tag
            this.renderer.removeChild(parent, originalHeadingTag);
        }

    }
}
