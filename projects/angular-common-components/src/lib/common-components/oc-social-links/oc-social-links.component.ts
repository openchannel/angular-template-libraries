import { Component, Input } from '@angular/core';
import { SocialLink } from '../model/social-link.model';

@Component({
    selector: 'oc-social-links',
    templateUrl: './oc-social-links.component.html',
    styleUrls: ['./oc-social-links.component.css'],
})
export class OcSocialLinksComponent {
    /** data passed to a social link component */
    @Input() socialLinks: SocialLink[];

}
