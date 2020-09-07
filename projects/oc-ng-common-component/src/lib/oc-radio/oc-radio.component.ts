import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-radio',
  templateUrl: './oc-radio.component.html',
  styleUrls: ['./oc-radio.component.scss']
})
export class OcRadioComponent implements OnInit {

  @Input() text: string;

  @Input() modelText;

  @Input() name;
  @Input() value;


  @Output() modelTextChange = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit(): void {
  }

  changeTo() {
    this.modelTextChange.emit(this.modelText);
  }

}
