import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oc-input',
  templateUrl: './oc-input.component.html',
  styleUrls: ['./oc-input.component.scss']
})
export class OcInputComponent implements OnInit {

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
