import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'oc-tag-element',
    templateUrl: './oc-tag-element.component.html',
    styleUrls: ['./oc-tag-element.component.css'],
})
export class OcTagElementComponent {
    /**
     * (Optional)
     * Title of the tag element.
     * @type {string}.
     */
    @Input() title: string;

    /**
     * (Optional)
     * Show the SVG icon on the right side of the title.
     * @type {boolean}.
     * @default false.
     */
    @Input() closeMarker: boolean = false;

    /**
     * Path to the SVG icon on the right side of the title.
     * Needed if {@link closeMarker} is set to `true`.
     * @type {string}.
     * @default close-icon.svg.
     */
    @Input() deleteTagImgUrl: string = 'assets/angular-common-components/close-icon.svg';

    /**
     * Output emitter, bound to a click event.
     * @type {string}.
     */
    @Output() readonly clickEmitter = new EventEmitter<string>();

    /**
     * Takes current tag title and emits it to a parent component.
     */
    sentCurrentTag(): void {
        this.clickEmitter.emit(this.title);
    }
}
