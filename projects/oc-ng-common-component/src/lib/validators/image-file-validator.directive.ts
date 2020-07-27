import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Validator, FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appImageFileValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ImageFileValidatorDirective, multi: true}]
})
export class ImageFileValidatorDirective implements Validator{

  @Input() accept: string;
  supportedExtensions=['.png','.jpg','.jpeg','.gif']
  // @Output() stringArrayChange = new EventEmitter();
  // @HostListener("change", ['$event']) change(event) {
  //   // let tmpVal = this.rawValue.replace(/•\t/g,"");
  //   // let finalArr = tmpVal.split("\n");
  //   // // this.stringArrayChange.emit(this.rawValue.split("\r\n•\t"));
  //   // this.stringArrayChange.emit(finalArr);
  //   this.validate(event);
  // }
  constructor() { }
  validate(control: any): ValidationErrors {
    try {
      if(control.value){
        let extension = control.value.substr(control.value.lastIndexOf('.'));
        let isValidImage = false;
        for (let index in this.supportedExtensions) {
                if(this.supportedExtensions[index].toUpperCase() === extension.toUpperCase()){
                  isValidImage = true;
                  break;
                }
        }
        const message = {
          'appImageFileValidator': {
            'message': 'Please provide valid png/jpg/jpeg/gif image file'
          }
        };
        return isValidImage ? null : message;
      }
    } catch (error) {
      
    }
  } 
}
