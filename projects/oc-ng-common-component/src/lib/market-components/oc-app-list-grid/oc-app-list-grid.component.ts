import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FullAppData} from 'oc-ng-common-component/src/lib/common-components/interfaces/app-data.model';

@Component({
  selector: 'oc-app-list-grid',
  templateUrl: './oc-app-list-grid.component.html',
  styleUrls: ['./oc-app-list-grid.component.scss']
})
export class OcAppListGridComponent implements OnInit {
  /**
   * The array of the apps what will be shown
   */
  @Input() appList: FullAppData[] = [];
  /**
   * Message that will be shown when no apps
   */
  @Input() noAppMessage = '';
  /**
   * App icon that will be shown when the app has no icon
   */
  @Input() defaultAppIcon = 'assets/oc-ng-common-component/standard-app-icon.svg';
  /**
   * Custom template for the app card
   */
  @Input() customAppCardTemplate: TemplateRef<FullAppData>;
  /**
   * Emitter for click on App card.
   */
  @Output() gotoDetails = new EventEmitter<FullAppData>();

  constructor() {
  }

  ngOnInit(): void {
  }

  viewDetails(app) {
    this.gotoDetails.emit(app);
  }
}
