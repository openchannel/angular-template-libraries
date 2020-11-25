import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultValueAccessor, NgModel} from '@angular/forms';

@Component({
  selector: 'oc-input',
  templateUrl: './oc-input.component.html',
  styleUrls: ['./oc-input.component.scss']
})
export class OcInputComponent implements OnInit {

  @Input() modelName;
  @Input() autoFocus;
  @Input() autocomplete;
  @Input() placeholder = '';
  @Input() isURL = false;

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
    let modelValue : string = this.modelName; 
    if(this.isURL && modelValue && !modelValue.startsWith("http://") && !modelValue.startsWith("https://")){
      this.modelName = "http://" + this.modelName;
      this.changeModelVal();
    }
    (this.control.valueAccessor as DefaultValueAccessor).onTouched();
  }

  changeModelVal() {
    this.modelNameChange.emit(this.modelName);
  }

}
