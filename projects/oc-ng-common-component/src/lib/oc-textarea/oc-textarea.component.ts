import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oc-textarea',
  templateUrl: './oc-textarea.component.html',
  styleUrls: ['./oc-textarea.component.scss']
})
export class OcTextareaComponent implements OnInit {

  @Input() placeholder;
  @Input() id = '';

  constructor() { }

  ngOnInit(): void {
  }

}
