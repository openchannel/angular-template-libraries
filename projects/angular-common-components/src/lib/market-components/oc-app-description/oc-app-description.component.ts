import { Component, Input, OnInit } from '@angular/core';
/**
 * Component represents heading and text which could be the description of the app or something else.
 * Description text can be truncated by a quantity of the characters. Also, it can contain HTML tags.
 * When text is truncated - the trigger button with `Show more` and `Show less` text will be shown.
 * @example
 * <oc-app-description
 *                     [appDescription]="app.description"
 *                     [truncateTextLength]="400"
 *                     header="About"
 *                     headerClass="custom-class"></oc-app-description>
 */
@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.css'],
})
export class OcAppDescriptionComponent implements OnInit {
    /** Main text of the component. */
    @Input() set appDescription(appDescription: string) {
        this.tempDescription = appDescription || '';
    }

    /** Header of the App Description section. */
    @Input() header: string = '';
    /** Show full description always. Text for expand description will not be shown. */
    @Input() showFullDescription: boolean = false;
    /** String with classes that will be applied to the header. */
    @Input() headerClass: string;
    /** Show button for switching between long and short description. */
    @Input() enableTruncateTextLogic: boolean = true;
    /** Limit for the description text length. If the text shorter than that parameter - the trigger button would not be shown. */
    @Input() truncateTextLength: number = 800;
    /** Text for switch button. Shows when description <= truncateTextLength. */
    @Input() showMoreDescriptionText: string = 'Show more';
    /** Text for switch button. Shows when description >= truncateTextLength. */
    @Input() showLessDescriptionText: string = 'Show less';
    /** Variable for the description text */
    tempDescription: string;
    /** Variable for the length of the description text */
    tempDescriptionLength: number;
    /** Marker for check of truncated text. If text is truncated, variable will be `true` */
    isTruncatedText: boolean;
    /** Text of the trigger button */
    currentShowDescriptionText: string;
    /** Current main text. Can contain HTML tags. */
    currentDescriptionText: string;

    constructor() {}

    ngOnInit(): void {
        this.initDescriptionWithShowOption(this.showFullDescription);
    }

    /**
     * Init all settings and parts for the component.
     * @param skipTruncate skip truncate logic. When `true`, text not be truncated.
     */
    initDescriptionWithShowOption(skipTruncate: boolean): void {
        this.initDescriptionLength();
        this.initDescriptionText(skipTruncate);
        this.initShowMoreText();
    }

    /**
     * This function gets a length of the current description text.
     */
    initDescriptionLength(): void {
        this.tempDescriptionLength = this.getTextFromHtml(this.tempDescription).length;
    }

    /**
     * Truncate description if need.
     * @param skipTruncate Skip truncate logic. When `true`, text not be truncated.
     */
    initDescriptionText(skipTruncate: boolean): void {
        let tempDescriptionHtml = this.tempDescription;
        if (!skipTruncate && this.enableTruncateTextLogic && this.truncateTextLength < this.tempDescriptionLength) {
            tempDescriptionHtml = this.truncateWithHTML(this.tempDescription, this.truncateTextLength);
        }
        this.isTruncatedText = tempDescriptionHtml && tempDescriptionHtml.length !== this.tempDescription.length;
        this.currentDescriptionText = tempDescriptionHtml;
    }

    /**
     * Settings for the trigger button.
     */
    initShowMoreText(): void {
        if (!this.showFullDescription && this.enableTruncateTextLogic && this.tempDescription?.length > this.truncateTextLength) {
            this.currentShowDescriptionText = this.isTruncatedText ? this.showMoreDescriptionText : this.showLessDescriptionText;
        } else {
            this.currentShowDescriptionText = '';
        }
    }

    /**
     * Creating a temporary element for getting the text with HTML tags.
     * @param html current text
     */
    getTextFromHtml(html: string): string {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    /**
     * Truncating text with HTML tags.
     * @param htmlText text with tags
     * @param truncateTo quantity of characters
     */
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
