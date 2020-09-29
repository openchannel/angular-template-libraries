import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'oc-dynamic-array-item',
  templateUrl: './oc-dynamic-array-item.component.html',
  styleUrls: ['./oc-dynamic-array-item.component.scss']
})
export class OcDynamicArrayItemComponent implements OnInit {

  /** Data of form fields. Required parameter */
  @Input() set subFields(value) {
    if (value) {
      this.subFieldDefinition = value;
    } else {
      throw Error('Required @Input : subFields');
    }
  }
  @Input() index: number = 0;

  public showDetail: boolean = false;
  public subFieldDefinition: any [] = [];
  constructor() { }

  ngOnInit(): void {
  }

  changeDetailStatus(): void {
    this.showDetail = !this.showDetail;
  }
}
