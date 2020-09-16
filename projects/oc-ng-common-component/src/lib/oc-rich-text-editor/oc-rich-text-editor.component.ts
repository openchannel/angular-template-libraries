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
   * Show char counter. Default: false
   */
  @Input() charCounterCount: boolean = false;
  /**
   * Max Editor characters limit. Default: -1 (unlimited)
   */
  @Input() maxCharacters: number = -1;
  /**
   * Make text editor data required. Default: false
   */
  @Input() required: boolean = false;
  /**
   * Label of the current Editor
   */
  @Input() label: string = '';
  /**
   * Setter for value changing
   */
  @Input()
  set value(val) {
    this.editorContent = val;
    this.onChange(this.editorContent);
  }

  public options = {
    heightMin: 100,
    heightMax: 150,
    height: 'auto',
    placeholderText: this.placeholder,
    charCounterCount: this.charCounterCount,
    charCounterMax: this.maxCharacters,
    fontSizeDefaultSelection: '14',
    attribution: false,
    fontFamilyDefaultSelection: 'Arial',
    paragraphFormatSelection: true,
    toolbarButtonsSM: [
      ['paragraphFormat'],
      ['bold', 'italic', 'strikeThrough', 'fontFamily', 'fontSize'],
      ['insertLink'],
      ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
      ['formatOL', 'formatUL', 'outdent', 'indent'],
      ['html']
    ],
    toolbarButtonsXS: {
      moreParagraph: {
        buttons: ['paragraphFormat', 'alignCenter', 'alignRight', 'alignJustify',
          'formatOL', 'formatUL', 'outdent', 'indent'],
        buttonsVisible: 1
      },
      moreText: {
        buttons: ['bold', 'italic', 'strikeThrough', 'fontFamily', 'fontSize'],
        buttonsVisible: 5
      },
      moreRich: {
        buttons: ['insertLink', 'html'],
        buttonsVisible: 2
      }
    }
  };
  public editorContent: SafeHtml;

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() { }

  ngOnInit(): void {
    this.options.placeholderText = this.placeholder;
    this.options.charCounterCount = this.charCounterCount;
    this.options.charCounterMax = this.maxCharacters;
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
