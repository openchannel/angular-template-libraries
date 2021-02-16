import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'oc-button',
  templateUrl: './oc-button.component.html',
  styleUrls: ['./oc-button.component.scss'],
})
export class OcButtonComponent implements OnChanges, AfterViewInit {

  buttonType: string = 'primary';
  showButton = false;
  buttonTypeClass: string;

  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() class: string;
  @Input() style: string;
  @Input() customClass: string;
  @Input() customTemplate: TemplateRef<any>;
  @Input() process: boolean;

  @Input() set type(type: 'primary' | 'secondary' | 'link' | 'danger' | 'none') {
    this.buttonType = type;
    this.buttonTypeClass = type !== 'none' ? `btn-${this.buttonType}` : null;
    this.showButton = true;
  }

  @ViewChild('button') button;

  public spinnerColor: string;

  constructor(private spinner: NgxSpinnerService) {
  }

  ngAfterViewInit() {
    this.spinnerColor = window.getComputedStyle(this.button.nativeElement).color;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.process && changes.process.previousValue !== changes.process.currentValue) {
      this.checkSpinner();
    }
  }

  checkSpinner(): void {
    if (this.process && this.buttonType !== 'link') {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }
}
