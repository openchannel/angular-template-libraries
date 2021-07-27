import { Component, Input } from '@angular/core';

@Component({
    selector: 'oc-tooltip-label',
    templateUrl: './oc-tooltip-label.component.html',
    styleUrls: ['./oc-tooltip-label.component.css'],
})
export class OcTooltipLabelComponent {
    /**
     * The text for tooltip label.
     * @type {string}.
     * Default empty.
     */
    @Input() text: string = '';

    /**
     * The value that defines whether a field will be required or not.
     * Shown as an asterisk.
     * @type {boolean}.
     * Default false.
     */
    @Input() required: boolean = false;

    /**
     * Description (optional) - description for a title.
     * Open small modal panel on the right side with this description text.
     * @type {string}.
     * Default empty.
     */
    @Input() description: string = '';

    /**
     * infoTitleIconCsv (optional) - the path to the description icon.
     * @type {string}.
     * Default 'assets/angular-common-components/info.svg'
     */
    @Input() infoTitleIconCsv: string = 'assets/angular-common-components/info.svg';

    /**
     * Set custom classes for label.
     * Optional.
     * @type {string}.
     * Default empty.
     */
    @Input() labelClass: string = '';
}
