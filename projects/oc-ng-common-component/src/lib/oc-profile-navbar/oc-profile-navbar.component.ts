import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModel} from 'oc-ng-common-service';

@Component({
  selector: 'oc-profile-navbar',
  templateUrl: './oc-profile-navbar.component.html',
  styleUrls: ['./oc-profile-navbar.component.scss']
})
export class OcProfileNavbarComponent implements OnInit {

  /**
   * Username initials that will be shown in the avatar circle.
   * If not set - avatar circle will not be shown
   */
  @Input() initials: string;
  /**
   * Name of the user that will be shown at the top near the avatar circle.
   * If not set - username text will not be shown
   */
  @Input() username: string;
  /**
   * Role of the user that will be shown at the bottom near the avatar circle.
   * If not set - role text will not be shown
   */
  @Input() role: string;
  /**
   * Items for the dropdown list
   */
  @Input() dropdownItems: DropdownModel<string>[];
  /**
   * Set this property to 'true' to hid the dropdown menu.
   * Default: 'false'
   */
  @Input() hidDropdown: boolean = false;
  /**
   * Emit event when user click the logout button
   */
  @Output() logout: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Emit event with chosen dropdown item
   */
  @Output() chosenDropdownItem: EventEmitter<DropdownModel<string>> = new EventEmitter<DropdownModel<string>>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
