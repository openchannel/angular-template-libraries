import { Component, Input } from '@angular/core';
import { SocialLink } from '../interfaces/social-link.model';

@Component({
    selector: 'oc-social-links',
    templateUrl: './oc-social-links.component.html',
    styleUrls: ['./oc-social-links.component.scss'],
})
export class OcSocialLinksComponent {
    /** data passed to a social link component */
    @Input() socialLinks: SocialLink[];

    constructor() {}
}
