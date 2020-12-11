import {TemplateRef} from '@angular/core';

export interface ToastOptions {
  type?: 'success' | 'danger' | null;
  classname?: string;
  delay?: number;
}

export interface Toast extends ToastOptions {
  textOrTmpl: string | TemplateRef<any>;
}
