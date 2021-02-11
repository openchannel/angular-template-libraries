import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModel} from 'oc-ng-common-service';

@Component({
  selector: 'oc-profile-navbar',
  templateUrl: './oc-profile-navbar.component.html',
  styleUrls: ['./oc-profile-navbar.component.scss']
})
export class OcProfileNavbarComponent implements OnInit {

  /**
   * Username initials that will be shown in the avatar circle
   */
  @Input() initials: string;
  /**
   * Name of the user that will be shown at the top near the avatar circle
   */
  @Input() username: string;
  /**
   * Role of the user that will be shown at the bottom near the avatar circle
   */
  @Input() role: string;
  /**
   * Items for the dropdown list
   */
  @Input() dropdownItems: DropdownModel<string>[];
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
