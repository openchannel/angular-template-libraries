import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'oc-input',
  templateUrl: './oc-input.component.html',
  styleUrls: ['./oc-input.component.scss']
})
export class OcInputComponent implements OnInit {

  @Input() modelName;
  @Input() autoFocus;

  @Output() modelNameChange = new EventEmitter<any>();
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit invoked");
    if(this.autoFocus){
      setTimeout(() => this.el.nativeElement.children[0].focus(), 0);
    }
  }

  changeModelVal() {
    this.modelNameChange.emit(this.modelName);
  }

}
