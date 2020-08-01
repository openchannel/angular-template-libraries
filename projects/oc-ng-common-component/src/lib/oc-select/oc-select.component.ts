import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oc-select',
  templateUrl: './oc-select.component.html',
  styleUrls: ['./oc-select.component.scss']
})
export class OcSelectComponent implements OnInit {

  constructor() { }

  @Input() selectValArr: string[]=[];

  @Input() defaultBlankValue="Select";

  @Output() selectionChange= new EventEmitter();
  ngOnInit(): void {
  }

  onSelectionChange($event){
    this.selectionChange.emit($event);
  }
}
