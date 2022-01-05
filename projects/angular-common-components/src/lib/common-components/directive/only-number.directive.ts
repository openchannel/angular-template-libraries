import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[ocOnlyNumber]',
})
export class OnlyNumberDirective {
    @Input() decimalCount: number;

    private readonly controlKeys: string[] = ['a', 'c', 'v', 'x'];
    private readonly navigationKeys: string[] = ['Home', 'End', 'ArrowRight', 'ArrowLeft', 'Backspace', '-', '.'];

    constructor(private el: ElementRef) {}

    @HostListener('keydown', ['$event']) handleKeyboardEvent(e: KeyboardEvent): void {
        if (e.key === '.' && this.decimalCount === 0) {
            e.preventDefault();
        } else if (
            // Allow: Ctrl(Meta) + (A or C or V or X)
            (this.controlKeys.includes(e.key) && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right etc.
            this.navigationKeys.includes(e.key)
        ) {
            // let it happen, don't do anything
            return;
        }

        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key))) {
            e.preventDefault();
            return;
        }
        if (this.decimalCount > 0) {
            this.processDecimalCount(e);
        }
    }

    processDecimalCount(event: KeyboardEvent): void {
        const value = this.el.nativeElement.value;
        if (value) {
            const decimalPart = value.toString().split('.')[1];
            if (decimalPart && decimalPart.length >= this.decimalCount) {
                event.preventDefault();
            }
        }
    }
}
