import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultValueAccessor, NgModel} from '@angular/forms';

@Component({
  selector: 'oc-select',
  templateUrl: './oc-select.component.html',
  styleUrls: ['./oc-select.component.scss']
})
export class OcSelectComponent implements OnInit {

  @Input() selectValArr = [];
  @Input() defaultBlankValue = "Select";
  @Output() valueChange = new EventEmitter();
  @Input() value;
  @Input() stringVal = false;
  @Input() disabled = false;

  constructor(private control: NgModel) {
  }

  ngOnInit(): void {
  }

  onSelectionChange($event) {
    this.valueChange.emit($event);
  }

  onblur() {
    (this.control.valueAccessor as DefaultValueAccessor).onTouched();
  }
}
