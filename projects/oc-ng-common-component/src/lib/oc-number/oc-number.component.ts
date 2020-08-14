import { Component, OnInit, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { NgModel, DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'oc-number',
  templateUrl: './oc-number.component.html',
  styleUrls: ['./oc-number.component.scss']
})
export class OcNumberComponent implements OnInit {

  @Input() modelName;
  @Input() autoFocus;
  @Input() autocomplete;
  @Input() placeholder = '';

  @Output() modelNameChange = new EventEmitter<any>();
  @Input() disabled = false;
  constructor(private el: ElementRef, private control: NgModel) {

  }

  ngOnInit(): void {

    if (this.autocomplete) {
      this.el.nativeElement.children[0].autocomplete = this.autocomplete;
    }
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit invoked");
    if (this.autoFocus) {
      setTimeout(() => this.el.nativeElement.children[0].focus(), 0);
    }
  }

  onblur() {
    (this.control.valueAccessor as DefaultValueAccessor).onTouched();
  }

  changeModelVal() {
    this.modelNameChange.emit(this.modelName);
  }

}
