import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';

/**
 *
 * Description: Service to work with title.<br>
 *
 * @param {string} title
 *
 * Methods:
 *
 * setPrefix
 *
 * setPostfix
 *
 * setSpecialTitle
 *
 */
@Injectable({
    providedIn: 'root',
})
export class TitleService {
    title: string;

    constructor(private titleService: Title, private router: Router) {
        this.router.events.subscribe(value => {
            if (value instanceof ActivationStart) {
                const subtitle = value.snapshot.data.title;
                this.setPrefix(subtitle);
            }
        });
    }

    /**
     * Description: Set subtitle on the left side of a pipe
     *
     * @param {string} subtitle
     * @returns {void}
     *
     * ### Example
     * ``
     * setPrefix("Prefix")
     * ``
     */
    setPrefix(subtitle: string): void {
        const siteTitle = `${subtitle ? `${subtitle} | ` : ''}${this.title}`;
        this.titleService.setTitle(siteTitle);
    }
    /**
     *  Description: Set subtitle on the right side of a pipe
     *
     * @param {string} subtitle
     * @returns {void}
     *
     * ### Example
     * ``
     * setPostfix("Postfix")
     * ``
     */
    setPostfix(subtitle: string): void {
        const siteTitle = `${this.title}${subtitle ? ` | ${subtitle}` : ''}`;
        this.titleService.setTitle(siteTitle);
    }

    /**
     * Description: Set custom title to the right or left side of a pipe.
     *
     * @param {string} newTitlePart - (required) new title part to override
     * @param {boolean} rightPart - (optional) if its 'true' - set new title part on the right side
     * @returns {void}
     *
     * ### Example
     * ``
     * setSpecialTitle("Title", true)
     * ``
     */
    setSpecialTitle(newTitlePart: string, rightPart?: boolean): void {
        if (rightPart) {
            this.setPostfix(newTitlePart);
        } else {
            this.setPrefix(newTitlePart);
        }
    }
}
