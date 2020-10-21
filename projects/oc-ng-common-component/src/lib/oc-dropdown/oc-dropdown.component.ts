import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectModel} from 'oc-ng-common-service';

@Component({
  selector: 'oc-dropdown',
  templateUrl: './oc-dropdown.component.html',
  styleUrls: ['./oc-dropdown.component.scss']
})
export class OcDropdownComponent implements OnInit {

  @Output()
  selectedChange: EventEmitter<SelectModel> = new EventEmitter<SelectModel>();

  @Input()
  selected: SelectModel;

  @Input()
  options: SelectModel[];

  constructor() { }

  ngOnInit(): void {
  }

  onSortChange(selected: SelectModel) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}
