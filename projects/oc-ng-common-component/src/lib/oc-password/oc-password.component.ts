import { Component, OnInit, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { NgModel, DefaultValueAccessor } from '@angular/forms';

@Component({
  selector: 'oc-password',
  templateUrl: './oc-password.component.html',
  styleUrls: ['./oc-password.component.scss']
})
export class OcPasswordComponent implements OnInit {

  @Input() modelName;
  @Input() focus;
  @Input() autocomplete;

  @Output() modelNameChange = new EventEmitter<any>();
  constructor(private el: ElementRef,private control:NgModel) {  }

  ngOnInit(): void {
    if(this.autocomplete){
      this.el.nativeElement.children[0].autocomplete = this.autocomplete;  
    }    
  }

  changeModelVal() {
    this.modelNameChange.emit(this.modelName);
  }

  onblur(){
    (this.control.valueAccessor as DefaultValueAccessor).onTouched();
  }

}
