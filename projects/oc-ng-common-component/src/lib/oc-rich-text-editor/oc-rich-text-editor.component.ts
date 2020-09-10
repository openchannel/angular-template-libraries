import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'oc-rich-text-editor',
  templateUrl: './oc-rich-text-editor.component.html',
  styleUrls: ['./oc-rich-text-editor.component.scss']
})
export class OcRichTextEditorComponent implements OnInit {
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
   * Getting content of the editor through event
   */
  @Output() getEditorContent = new EventEmitter<SafeHtml>();

  public options = {
    placeholderText: this.placeholder,
    charCounterCount: this.charCounterCount,
    charCounterMax: this.maxCharacters,
    fontSizeDefaultSelection: '14',
    attribution: false,
    fontFamilyDefaultSelection: 'Arial',
    paragraphFormatSelection: true,
    toolbarButtons: [
      ['paragraphFormat'],
      ['bold', 'italic', 'strikeThrough', 'fontFamily', 'fontSize'],
      ['insertLink'],
      ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
      ['formatOL', 'formatUL', 'outdent', 'indent'],
      ['html']
    ]
  };
  public editorContent: SafeHtml;

  constructor() { }

  ngOnInit(): void {
    this.options.placeholderText = this.placeholder;
    this.options.charCounterCount = this.charCounterCount;
    this.options.charCounterMax = this.maxCharacters;
  }

  sendData() {
    this.getEditorContent.emit(this.editorContent);
  }
}
