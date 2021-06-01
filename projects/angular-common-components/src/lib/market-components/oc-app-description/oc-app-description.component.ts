import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.scss'],
})
export class OcAppDescriptionComponent implements OnInit {
    /** App Description text */
    @Input() set appDescription(appDescription: string) {
        this.tempDescription = this.stripHtml(appDescription || '');
    }
    /** Header of the App Description section */
    @Input() header: string = '';
    /** Show full description always. Text for expand description will not be shown */
    @Input() showFullDescription: boolean = false;
    /** String with classes that will be applied to the header */
    @Input() headerClass: string;
    /** Show button for switching between long and short description. */
    @Input() enableTruncateTextLogic = true;
    /** Limit for description length for showing switch button */
    @Input() truncateTextLength: number = 800;
    /** Text for switch button. Shows when description <= truncateTextLength. */
    @Input() showMoreDescriptionText: string = 'Show more';
    /** Text for switch button. Shows when description >= truncateTextLength. */
    @Input() showLessDescriptionText: string = 'Show less';

    tempDescription: string;
    isTruncatedText: boolean;
    currentShowDescriptionText: string;
    currentDescriptionText: string;

    constructor() {
    }

    ngOnInit(): void {
        this.initDescriptionWithShowOption(this.showFullDescription);
    }


    initDescriptionWithShowOption(skipTruncate: boolean): void {
        this.initDescriptionText(skipTruncate);
        this.initShowMoreText();
    }

    /**
     * Truncate description if need.
     * @param skipTruncate - when true, text not be truncated.
     */
    initDescriptionText(skipTruncate: boolean): void {
        if (!skipTruncate
            && this.enableTruncateTextLogic
            && this.truncateTextLength < this.tempDescription?.length) {
            const newTextLength = this.truncateTextLength > 3 ? this.truncateTextLength - 3 : 0;
            this.currentDescriptionText = `${this.tempDescription.substring(0, newTextLength)}...`;
        } else {
            this.currentDescriptionText = this.tempDescription;
        }
    }

    initShowMoreText(): void {
        if (!this.showFullDescription && this.enableTruncateTextLogic && this.tempDescription?.length > this.truncateTextLength) {
            this.isTruncatedText = this.currentDescriptionText.length !== this.tempDescription.length;
            this.currentShowDescriptionText = this.isTruncatedText ? this.showMoreDescriptionText : this.showLessDescriptionText;
        } else {
            this.currentShowDescriptionText = '';
        }
    }

    stripHtml(html: string): string {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }
}
