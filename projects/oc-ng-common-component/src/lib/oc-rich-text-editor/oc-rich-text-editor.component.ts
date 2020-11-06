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
  @Input() placeholder: string = 'Write Your Content Here!';
  /**
   * Developer API key for TinyMCE rich text editor
   */
  @Input() tinyEditorApiKey: string = '979365t8xjz78m2q0fv4bwm2ezh77txvqtoezs9yupaev41t';
  /**
   * Setter for value changing
   */
  @Input()
  set value(val) {
    this.editorContent = val;
    this.onChange(this.editorContent);
  }
  // options for Tiny Editor
  public tinyOptions = {
    menubar: false,
    toolbar: 'bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
      'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
    plugins: 'lists link wordcount',
    placeholder: '',
    max_height: 150
  };
  public editorContent: SafeHtml;

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() { }

  ngOnInit(): void {
    this.tinyOptions.placeholder = this.placeholder;
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
