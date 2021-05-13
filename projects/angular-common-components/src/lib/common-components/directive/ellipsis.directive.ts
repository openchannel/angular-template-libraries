import { AfterViewInit, Directive, ElementRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[ellipsis]',
})
export class EllipsisDirective implements AfterViewInit {
    /** The native HTMLElement. */
    private get el(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    /** The original innerText; */
    private innerText: string;

    constructor(private readonly elementRef: ElementRef, @Inject(PLATFORM_ID) private readonly platformId) {}

    ngAfterViewInit(): void {
        this.truncate();
    }

    @HostListener('window:resize') onWindowResize() {
        this.truncate();
    }

    private truncate(): void {
        // verify execution context is the browser platform
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        // store the original innerText
        if (this.innerText === undefined) {
            this.innerText = this.el.innerText.trim();
        }

        // reset the innerText
        this.el.innerText = this.innerText;

        // truncate the text and append the ellipsis
        const text = this.innerText.split(' ');
        while (text.length > 0 && this.el.scrollHeight > this.el.clientHeight) {
            text.pop();
            this.el.innerText = `${text.join(' ')}…`;
        }
    }
}
