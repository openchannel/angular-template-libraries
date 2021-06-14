import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectModel} from '../model/components-basic.model';

@Component({
  selector: 'oc-select-expandable',
  templateUrl: './oc-select-expandable.component.html',
  styleUrls: ['./oc-select-expandable.component.scss']
})
export class OcSelectExpandableComponent implements OnInit {

  @Input() title: string;

  @Input() selectModels: SelectModel[];
  @Input() collapsedOnInit: boolean = true;

  @Input() isCollapsed: boolean = true;
  @Input() expandedIcon: string = 'assets/angular-common-components/select-up.svg';
  @Input() collapsedIcon: string = 'assets/angular-common-components/down-arrow.svg';
  @Output() selectModelsChange: EventEmitter<SelectModel[]> = new EventEmitter<SelectModel[]>();
  
  ngOnInit(): void {
    this.isCollapsed = this.collapsedOnInit;
  }

  onChange() {
    this.selectModelsChange.emit(this.selectModels);
  }
}
