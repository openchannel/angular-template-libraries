import { Component, Input } from '@angular/core';

/**
 * Profile navbar component. Used to navigate the profile pages.
 * Consists of a button and ngb dropdown menu with items.
 * @type {string}.
 */
@Component({
    selector: 'oc-profile-navbar',
    templateUrl: './oc-profile-navbar.component.html',
    styleUrls: ['./oc-profile-navbar.component.scss'],
})
export class OcProfileNavbarComponent {
    /**
     * Username initials that will be shown in the avatar circle.
     * If not set - avatar circle will not be shown.
     * @type {string}.
     */
    @Input() initials: string;
    /**
     * Name of the user that will be shown at the top near the avatar circle.
     * If not set - username text will not be shown.
     * @type {string}.
     */
    @Input() username: string;
    /**
     * Role of the user that will be shown at the bottom near the avatar circle.
     * If not set - role text will not be shown.
     * @type {string}.
     */
    @Input() role: string;
}
