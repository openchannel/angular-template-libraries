import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oc-button',
  templateUrl: './oc-button.component.html',
  styleUrls: ['./oc-button.component.scss']
})
export class OcButtonComponent implements OnInit {
  @Input() text: string;
  @Input() disabled: boolean;
  @Input() type : string;
  @Input() class : string;
  @Input() style : string;
  @Input() process : string;
  constructor() { }

  ngOnInit(): void {
  }

}
