import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oc-select',
  templateUrl: './oc-select.component.html',
  styleUrls: ['./oc-select.component.scss']
})
export class OcSelectComponent implements OnInit {

  constructor() { }

  @Input() selectValArr;

  @Input() defaultBlankValue = "Select";

  @Output() valueChange = new EventEmitter();

  @Input() value;

  ngOnInit(): void {
  }

  onSelectionChange($event) {
    this.valueChange.emit($event);
  }
}
