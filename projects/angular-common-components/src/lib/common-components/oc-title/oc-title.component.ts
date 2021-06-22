import { Component, Input } from '@angular/core';

@Component({
    selector: 'oc-title',
    templateUrl: './oc-title.component.html',
    styleUrls: ['./oc-title.component.scss'],
})
export class OcTitleComponent {
    /**
     * Sets a text for the title component.
     * Required.
     * If no title - throws an error.
     * @type {string}.
     */
    @Input() set title(title: string) {
        if (!title) {
            throw Error('Required @Input : title');
        }
        this.titleText = title;
    }

    /**
     * Required fields indicator.
     * Optional.
     * Shows a red marker beside the fields that are required.
     * @type {boolean}.
     * Default: false
     */
    @Input() required: boolean = false;

    /**
     * A description for the title.
     * Optional.
     * @type {string}.
     * Default 'null'.
     * Open small modal panel on the right side with this description text.
     */
    @Input() description: string = null;

    /**
     * A tooltip icon for description text.
     * Optional.
     * @type {string}.
     * Default 'assets/angular-common-components/info.svg'.
     */
    @Input() infoTitleIconCsv: string = 'assets/angular-common-components/info.svg';

    /**
     * A custom class which can be added to the title for additional customizing.
     * @type {string}.
     * Optional.
     * Default empty.
     */
    @Input() customClass: string = '';

    /**
     * Custom styling which can be added to the title.
     * @type {Object.<>}.
     * Optional.
     * Supposed to be the style object.
     */
    @Input() customStyle: any;

    titleText: string;
}
