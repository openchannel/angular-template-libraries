import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'oc-password',
  templateUrl: './oc-password.component.html',
  styleUrls: ['./oc-password.component.scss']
})
export class OcPasswordComponent implements OnInit {

  @Input() modelName;
  @Input() focus;

  @Output() modelNameChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {

  }

  changeModelVal() {
    this.modelNameChange.emit(this.modelName);
  }


}
