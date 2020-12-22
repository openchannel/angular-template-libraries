import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oc-button',
  templateUrl: './oc-button.component.html',
  styleUrls: ['./oc-button.component.scss']
})
export class OcButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() class: string;
  @Input() style: string;
  @Input() process: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
