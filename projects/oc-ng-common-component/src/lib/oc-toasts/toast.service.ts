import {Injectable, TemplateRef} from '@angular/core';
import {Toast, ToastOptions} from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
    this.toasts.push({ textOrTmpl: textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
