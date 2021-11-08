import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[ocOnlyNumber]',
})
export class OnlyNumberDirective {
    @HostListener('keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent): void {
        const e: KeyboardEvent = event;
        if (
            // Allow: Ctrl(Meta)+A
            (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl(Meta)+C
            (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl(Meta)+V
            (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl(Meta)+X
            (e.key === 'x' && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            this.allowNavigationKeys(e)
        ) {
            // let it happen, don't do anything
            return;
        }

        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key))) {
            e.preventDefault();
        }
    }

    allowNavigationKeys(e: KeyboardEvent): boolean {
        return (
            e.key === 'Home' ||
            e.key === 'End' ||
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === 'Backspace' ||
            e.key === '.' ||
            e.key === '-'
        );
    }
}
