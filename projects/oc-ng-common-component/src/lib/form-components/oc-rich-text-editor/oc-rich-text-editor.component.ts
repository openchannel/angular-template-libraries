import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'oc-rich-text-editor',
  templateUrl: './oc-rich-text-editor.component.html',
  styleUrls: ['./oc-rich-text-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcRichTextEditorComponent),
    multi: true
  }],
})
export class OcRichTextEditorComponent implements OnInit, ControlValueAccessor {
  /**
   * Placeholder text data
   */
  @Input() set placeholder(value: string) {
    if (value) {
      this.placeholderText = value;
    }
  }
  /**
   * Setter for value changing
   */
  @Input()
  set value(val) {
    this.editorContent = val;
    this.onChange(this.editorContent);
  }

  public placeholderText: string = '';
  // options for Tiny Editor
  public tinyOptions = {
    base_url: '/tinymce',
    suffix: '.min',
    menubar: false,
    toolbar: 'bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
      'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
    plugins: 'lists link wordcount',
    placeholder: this.placeholderText,
    max_height: 150,
    content_style: 'body { font-family: Arial; }'
  };
  public editorContent: SafeHtml;
  public editorOnFocus: boolean = false;

  public onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() { }

  ngOnInit(): void {
    if (this.placeholderText) {
      this.tinyOptions.placeholder = this.placeholderText;
    }
  }

  /**
   * Listen to editor focus status for changing border style
   */
  changeEditorFocus(status) {
    this.editorOnFocus = status;
  }

  onModelChange(): void {
    this.onChange(this.editorContent);
  }
  /**
   * Calls this function with new value. When user wrote something in the component
   * It needs to know that new data has been entered in the control.
   */
  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }
  /**
   * Calls this function when user left chosen component.
   * It needs for validation
   */
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }
  /**
   * (Optional)
   * the method will be called by the control when the [disabled] state changes.
   */
  setDisabledState(isDisabled: boolean): void {
  }
  /**
   * this method will be called by the control to pass the value to our component.
   * It is used if the value is changed through the code outside
   * (setValue or changing the variable that ngModel is tied to),
   * as well as to set the initial value.
   */
  writeValue(obj: any): void {
    this.editorContent = obj;
  }
}
