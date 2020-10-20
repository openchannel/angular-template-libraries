import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectModel} from 'oc-ng-common-service';

@Component({
  selector: 'oc-select-expandable',
  templateUrl: './oc-select-expandable.component.html',
  styleUrls: ['./oc-select-expandable.component.scss']
})
export class OcSelectExpandableComponent implements OnInit {

  @Input() title: string;

  @Input() selectModels: SelectModel[];
  @Output() selectModelsChange: EventEmitter<SelectModel[]> = new EventEmitter<SelectModel[]>();

  @Input() collapsedOnInit: boolean = true;
  @Input() isCollapsed: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.isCollapsed = this.collapsedOnInit;
  }

  onChange() {
    this.selectModelsChange.emit(this.selectModels);
  }
}
