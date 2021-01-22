import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectModel, SidebarModel } from 'oc-ng-common-service';

@Component({
  selector: 'oc-sidebar',
  templateUrl: './oc-sidebar.component.html',
  styleUrls: ['./oc-sidebar.component.scss']
})
export class OcSidebarComponent implements OnInit {

  /** title of the sidebar */
  @Input() title: string;
  @Input() sidebarModel: SidebarModel[];
  @Input() tickCounterStart: number = 0;
  @Output() selectModelsChange: EventEmitter<SelectModel[]> = new EventEmitter<SelectModel[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(chosenLabel: string, chosenSubLabel?: string) {
    this.sidebarModel.forEach(item => {
      item.checked = item.label === chosenLabel && !chosenSubLabel;
      if (item.sublist && item.sublist.length > 0) {
        item.sublist.forEach(subItem => {
          subItem.checked = chosenSubLabel && subItem.label === chosenSubLabel;
        });
      }
    });
    this.selectModelsChange.emit(this.sidebarModel);
  }
}
