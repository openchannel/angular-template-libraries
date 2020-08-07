import { Directive, Attribute, HostListener, Input  } from '@angular/core';  
import { Validator,  NG_VALIDATORS, ValidationErrors, FormControl } from '@angular/forms';  


@Directive({  
  selector: '[compare-password]',  
  providers: [{provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true}]
})  

export class CompareDirective implements Validator {  

  // @Input() comparer: string;
  // @Input()  parent: string;
  constructor(@Attribute('compare-password') public comparer: string,  
              @Attribute('parent') public parent: string){}  
  // constructor(){}
  // @HostListener("change", ['$event']) change(event) {
  //     // let tmpVal = this.rawValue.replace(/•\t/g,"");
  //     // let finalArr = tmpVal.split("\n");
  //     // // this.stringArrayChange.emit(this.rawValue.split("\r\n•\t"));
  //     // this.stringArrayChange.emit(finalArr);
  //     this.validate(event);
  //   }

  // validate(c: FormControl): ValidationErrors {
    
  //   const isValidEmail = c.value ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,50}$/.test(c.value) : true; 
  //   const message = {
  //     'confirmPassword': {
  //       'message': 'Email seems to be invalid'
  //     }
  //   };
  //   return isValidEmail ? null : message;
  // }
  validate(c: any): {[key: string]: any} {  
    const e = c.root.get(this.comparer);  

    if (e && c.value !== e.value && !this.isParent) {  
      return { confirmPassword: true };  
    }  

    if (e && c.value === e.value && this.isParent) {  
        delete e.errors['confirmPassword'];  
        if (!Object.keys(e.errors).length) {  
            e.setErrors(null);  
        }  
    }  

    if (e && c.value !== e.value && this.isParent) {  
        e.setErrors({ confirmPassword: true });  
    }  
  }  

  private get isParent() {  
    if (!this.parent) {  
        return false;  
    }  
    return this.parent === 'true' ? true : false;  
  }  
}  