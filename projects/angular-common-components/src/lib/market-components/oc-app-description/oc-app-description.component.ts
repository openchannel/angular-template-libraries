import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.scss'],
})
export class OcAppDescriptionComponent implements OnInit {
    /** App Description text */
    @Input() set appDescription(appDescription: string) {
        this.tempDescription = appDescription || '';
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
    tempDescriptionLength: number;
    isTruncatedText: boolean;
    currentShowDescriptionText: string;
    currentDescriptionText: SafeHtml;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.initDescriptionWithShowOption(this.showFullDescription);
    }

    initDescriptionWithShowOption(skipTruncate: boolean): void {
        this.initDescriptionLength();
        this.initDescriptionText(skipTruncate);
        this.initShowMoreText();
    }

    initDescriptionLength(): void {
        this.tempDescriptionLength = this.getTextFromHtml(this.tempDescription).length;
    }

    /**
     * Truncate description if need.
     * @param skipTruncate - when true, text not be truncated.
     */
    initDescriptionText(skipTruncate: boolean): void {
        let tempDescriptionHtml = this.tempDescription;
        if (!skipTruncate && this.enableTruncateTextLogic && this.truncateTextLength < this.tempDescriptionLength) {
            tempDescriptionHtml = this.truncateWithHTML(this.tempDescription, this.truncateTextLength);
        }
        this.isTruncatedText = tempDescriptionHtml && tempDescriptionHtml.length !== this.tempDescription.length;
        this.currentDescriptionText = this.sanitizer.bypassSecurityTrustHtml(tempDescriptionHtml);
    }

    initShowMoreText(): void {
        if (!this.showFullDescription && this.enableTruncateTextLogic && this.tempDescription?.length > this.truncateTextLength) {
            this.currentShowDescriptionText = this.isTruncatedText ? this.showMoreDescriptionText : this.showLessDescriptionText;
        } else {
            this.currentShowDescriptionText = '';
        }
    }

    getTextFromHtml(html: string): string {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    truncateWithHTML(htmlText: string, truncateTo: number): string {
        const substrings = htmlText.split(/(<[^>]*>)/g);
        let count = 0;
        const truncated = [];

        for (const substr of substrings) {
            if (!substr.startsWith('<')) {
                if (count > truncateTo) {
                    continue;
                } else if (substr.length > truncateTo - count - 1) {
                    truncated.push(`${substr.substring(0, truncateTo - count)}...`);
                    return truncated.join('');
                } else {
                    truncated.push(substr);
                }
                count += substr.length;
            } else {
                truncated.push(substr);
            }
        }
        return truncated.join('');
    }
}
