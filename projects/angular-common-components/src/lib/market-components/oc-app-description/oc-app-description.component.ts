import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'oc-app-description',
    templateUrl: './oc-app-description.component.html',
    styleUrls: ['./oc-app-description.component.scss'],
})
export class OcAppDescriptionComponent implements OnInit {
    @ViewChild('description', { static: true }) description: HTMLParagraphElement;
    /** App Description text */
    @Input() set appDescription(value: string) {
        this.appDescriptionText = value || '';
    }
    /** Header of the App Description section */
    @Input() set header(header: string) {
        if (header) {
            this.headerText = header;
        }
    }
    /** Show full description always. Text for expand description will not be shown */
    @Input() showFullDescription: boolean = false;
    /** String with classes that will be applied to the header */
    @Input() headerClass: string;
    /** Threshold number to truncate text if 'show more' logic available */
    @Input() threshold: number;
    /** Boolean variable to allow 'show more' logic */
    @Input() allowTruncateLogic = true;

    cutAppDescription: SafeHtml = '';
    appDescriptionText: string;
    headerText: string = '';

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.rerenderDescription();
    }

    rerenderDescription(): void {
        if (this.appDescriptionText && this.appDescriptionText.length) {
            if (this.allowTruncateLogic && this.threshold) {
                let indexBrakeWord: number;
                let sizeBrakeWord: number;
                const tagsRegExp = /<[^>]+>/gi;
                const tagsArray = this.appDescriptionText.match(tagsRegExp);
                const textArray = this.appDescriptionText.split(tagsRegExp);
                textArray.pop();
                textArray.shift();
                textArray.reduce((acc, cur, i) => {
                    if (!indexBrakeWord && !sizeBrakeWord && (acc + cur).length >= this.threshold) {
                        indexBrakeWord = i;
                        sizeBrakeWord = this.threshold - acc.length;
                    }
                    return acc + cur;
                });
                textArray.length = indexBrakeWord + 1;
                textArray[indexBrakeWord] = textArray[indexBrakeWord].slice(0, sizeBrakeWord);
                this.cutAppDescription = this.sanitizer.bypassSecurityTrustHtml(
                    tagsArray.reduce((acc, curr, i) => acc + (i - 1 <= textArray.length - 1 ? textArray[i - 1] : '') + curr),
                );
            }
            if (this.threshold && this.appDescriptionText.length < this.threshold) {
                this.showFullDescription = true;
            }
        } else {
            this.cutAppDescription = '';
        }
    }
}
