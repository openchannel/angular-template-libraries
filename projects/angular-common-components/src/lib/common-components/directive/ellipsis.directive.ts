import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[ellipsis]',
})
export class EllipsisDirective implements AfterViewInit {
    @HostBinding('class.ellipsis-directive') ellipsisDirectiveClass = true;

    /** The native HTMLElement. */
    private get el(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    /** The original innerText; */
    private innerText: string;

    constructor(private readonly elementRef: ElementRef, @Inject(PLATFORM_ID) private readonly platformId: any) {}

    ngAfterViewInit(): void {
        this.truncate();
    }

    @HostListener('window:resize') onWindowResize(): void {
        this.truncate();
    }

    getIsTextOverflows(): boolean {
        return this.el.scrollHeight > this.el.clientHeight;
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
        let text = this.innerText;
        while (text.length > 0 && this.getIsTextOverflows()) {
            text = text.slice(0, -1);
            this.el.innerText = `${text}…`;
        }
    }
}
