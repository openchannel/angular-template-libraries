import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[passwordToggle]'
  })
  export class PasswordToggleDirective  {
   
    private showPasswordText = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;8
    const current = this.el.nativeElement;
    const span = document.createElement('span');
    span.setAttribute("style","float:right; color:black;");
    span.setAttribute("class","toggle_password fas fa-eye");        
    span.addEventListener('click', () => {
      console.log("click event");
        this.toggle(current,span,parent);
    });
    parent.appendChild(span);
  }

  toggle(current: HTMLElement,span:HTMLElement,parent:HTMLElement) {

    this.showPasswordText = this.showPasswordText ? false : true;
    if (this.showPasswordText) {
      span.setAttribute("class","toggle_password fas fa-eye-slash");  
      current.setAttribute('type', 'text');
      parent.removeChild(span);
      parent.appendChild(span);
    } else {
      span.setAttribute("class","toggle_password fas fa-eye");          
        current.setAttribute('type', 'password');
        parent.removeChild(span);
        parent.appendChild(span);
       
    }
  }
  }