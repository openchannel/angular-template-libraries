import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'oc-tag-element',
    templateUrl: './oc-tag-element.component.html',
    styleUrls: ['./oc-tag-element.component.scss'],
})
export class OcTagElementComponent {
    /**
     * Title of the tag element.
     * @type {string}.
     * Optional.
     */
    @Input() title: string;

    /**
     * CloseMarker - show the SVG icon on the right side of the title.
     * @type {boolean}.
     * Optional.
     * Default false.
     */
    @Input() closeMarker: boolean = false;

    /**
     * Path to the SVG icon on the right side of the title.
     * Needed if 'closeMarker' is set to true.
     * @type {string}.
     * Default 'assets/angular-common-components/close-icon.svg'.
     */
    @Input() deleteTagImgUrl: string = 'assets/angular-common-components/close-icon.svg';

    /**
     * Output emitter, bound to a click event.
     * @type {string}.
     */
    @Output() readonly clickEmitter = new EventEmitter<string>();

    constructor() {}

    /**
     * Takes current tag title and emits it to a parent component.
     */
    sentCurrentTag(): void {
        this.clickEmitter.emit(this.title);
    }
}
