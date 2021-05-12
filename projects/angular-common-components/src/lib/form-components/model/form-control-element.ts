export class FormControlElement<T> {
  value: T;
  key: string;
  label: string;
  id: string;
  description: string;
  required: boolean;
  minValue: number;
  maxValue: number;
  accept: string;
  hash: string;
  height: number;
  width: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: {
    id?: string;
    value?: T;
    key?: string;
    label?: string;
    description?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    minValue?: number;
    maxValue?: number;
    accept?: string;
    hash?: string;
    height?: number;
    width?: number;
    type?: string;
    options?: {key: string, value: string}[];
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.id = options.id;
    this.description = options.description || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
