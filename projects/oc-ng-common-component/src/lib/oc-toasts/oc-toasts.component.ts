import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ToastService} from './toast.service';
import {Toast} from './toast.model';

@Component({
  selector: 'oc-toasts',
  templateUrl: './oc-toasts.component.html',
  styleUrls: ['./oc-toasts.component.scss']
})
export class OcToastsComponent implements OnInit {

  @ViewChild('success') successTemplate: TemplateRef<any>;
  @ViewChild('danger') dangerTemplate: TemplateRef<any>;
  @ViewChild('text') textTemplate: TemplateRef<any>;

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  chooseTemplate(toast: Toast): TemplateRef<any> {
    if (toast.textOrTmpl instanceof TemplateRef) {
      return toast.textOrTmpl;
    }

    switch (toast.type) {
      case 'danger':
        return this.dangerTemplate;
      case 'success':
        return this.successTemplate;
      default:
        return this.textTemplate;
    }
  }
}
