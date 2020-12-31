import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'oc-select',
  templateUrl: './oc-select.component.html',
  styleUrls: ['./oc-select.component.scss']
})
export class OcSelectComponent implements OnInit {

  constructor(private control: NgModel) { }

  @Input() selectValArr = [];

  @Input() defaultBlankValue = "Select";

  @Output() valueChange = new EventEmitter();

  @Input() value;

  @Input() id = "";

  @Input() stringVal = false;
  
  @Input() disabled = false;

  ngOnInit(): void {
  }

  onSelectionChange($event) {
    this.valueChange.emit($event);
  }

  onblur() {
    (this.control.valueAccessor as DefaultValueAccessor).onTouched();
  }
}
