import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oc-label',
  templateUrl: './oc-label.component.html',
  styleUrls: ['./oc-label.component.scss']
})
export class OcLabelComponent implements OnInit {
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() required: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
