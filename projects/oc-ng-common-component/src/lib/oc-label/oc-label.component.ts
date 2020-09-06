import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oc-label',
  templateUrl: './oc-label.component.html',
  styleUrls: ['./oc-label.component.scss']
})
export class OcLabelComponent implements OnInit {
  @Input() text;
  @Input() class;
  @Input() required;

  constructor() {
  }

  ngOnInit(): void {
  }

}
