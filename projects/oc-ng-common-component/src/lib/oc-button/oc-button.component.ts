import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'oc-button',
  templateUrl: './oc-button.component.html',
  styleUrls: ['./oc-button.component.scss'],
})
export class OcButtonComponent implements OnInit, OnChanges {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' | 'link' = 'primary';
  @Input() class: string;
  @Input() style: string;
  @Input() process: boolean;
  @Input() customClass: string;
  @Input() customTemplate: TemplateRef<any>;

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.process && changes.process.previousValue !== changes.process.currentValue) {
      this.checkSpinner();
    }
  }

  checkSpinner(): void {
    if (this.process && this.type !== 'link') {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
