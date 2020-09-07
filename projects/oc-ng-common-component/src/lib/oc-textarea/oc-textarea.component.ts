import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'oc-textarea',
  templateUrl: './oc-textarea.component.html',
  styleUrls: ['./oc-textarea.component.scss']
})
export class OcTextareaComponent implements OnInit {

  @Input() placeholder;

  constructor() {
  }

  ngOnInit(): void {
  }

}
