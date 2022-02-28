import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[ocAutofocus]',
})
export class AutofocusDirective implements OnInit {
    @Input() ocAutofocus = false;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        if (this.ocAutofocus) {
            this.focus();
        }
    }

    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
