import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.scss'],
})
export class OcAppDescriptionComponent implements OnInit {
    /** App Description text */
    @Input() appDescription: string = '';
    @Input() set header(header: string) {
        if (header) {
            this.headerText = header;
        }
    }
    /**
     * Text that will be shown on expand description button
     * Default: 'Show full description'
     */
    @Input() expandDescriptionText: string = 'Show full description';
    /**
     * Text that will be shown on expand description button
     * Default: 'Hide full description'
     */
    @Input() collapseDescriptionText: string = 'Hide full description';
    /** Show full description always. Text for expand description will not be shown */
    @Input() showFullDescription: boolean = false;
    /** String with classes that will be applied to the header */
    @Input() headerClass: string;
    /** Header of the App Description section */
    headerText: string = '';
    descriptionTriggerText: string;
    showDescription: boolean = false;

    constructor() {}

    ngOnInit(): void {
        this.checkOfText();
    }

    triggerDescription(): void {
        this.showDescription = !this.showDescription;
        this.checkOfText();
    }

    checkOfText(): void {
        if (this.appDescription.length < 245 || this.showFullDescription) {
            this.showDescription = true;
        } else {
            this.descriptionTriggerText = this.showDescription ? this.collapseDescriptionText : this.expandDescriptionText;
        }
    }
}
