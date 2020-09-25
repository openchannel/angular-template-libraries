import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-checkbox',
  templateUrl: './oc-checkbox.component.html',
  styleUrls: ['./oc-checkbox.component.scss']
})
export class OcCheckboxComponent implements OnInit {
  @Input() set isChecked(value) {
    this.checked = value;
    console.log(this.checked);
  }
  @Input() labelText: string;

  @Output() isCheckedChange = new EventEmitter<any>();
  public checked: boolean;
  constructor() {
  }

  ngOnInit(): void {
  }

  changeModelVal() {
    this.isCheckedChange.emit(this.checked);
  }

}
