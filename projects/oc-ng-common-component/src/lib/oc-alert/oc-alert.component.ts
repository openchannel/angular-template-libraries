import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-alert',
  templateUrl: './oc-alert.component.html',
  styleUrls: ['./oc-alert.component.scss']
})
export class OcAlertComponent implements OnInit {
  @Input() dismissible = false;
  @Input() text: string;
  @Output() closeClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
