import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Rich text editor component. It is used for the confirmation some action from the user.
 * Component represents a specific block which allows to write/insert/edit text, code snippets etc.
 */
@Component({
    selector: 'oc-rich-text-editor',
    templateUrl: './oc-rich-text-editor.component.html',
    styleUrls: ['./oc-rich-text-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcRichTextEditorComponent),
            multi: true,
        },
    ],
})
export class OcRichTextEditorComponent implements OnInit, ControlValueAccessor {
    /**
     * Text editor placeholder.
     * @type {string}.
     */
    @Input() set placeholder(value: string) {
        if (value) {
            this.placeholderText = value;
        }
    }

    /**
     * Sets editor content model initially and when changing.
     * @type {SafeHtml}.
     */
    @Input() set value(val: any) {
        this.editorContent = val;
        this.onChange(this.editorContent);
    }

    placeholderText: string = '';

    // options for Tiny Editor
    tinyOptions = {
        base_url: '/tinymce',
        suffix: '.min',
        menubar: false,
        toolbar:
            'formatselect | bold italic underline strikethrough subscript superscript fontselect fontsizeselect |' +
            'alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link unlink | undo redo',
        plugins: 'lists link wordcount',
        placeholder: this.placeholderText,
        max_height: 150,
        content_style: 'body { font-family: Arial; }',
        mobile: {
            toolbar_mode: 'sliding',
            max_height: 300,
            height: 220,
            toolbar:
                'formatselect | bold italic underline strikethrough | undo redo | fontselect fontsizeselect | numlist bullist | ' +
                ' alignleft aligncenter alignright alignjustify | outdent indent | subscript superscript | link unlink |',
        },
    };

    editorContent: SafeHtml;
    editorOnFocus: boolean = false;
    disabled: boolean;

    ngOnInit(): void {
        if (this.placeholderText) {
            this.tinyOptions.placeholder = this.placeholderText;
        }
    }

    /**
     * Listen to editor focus status for changing border style.
     * @type {boolean}.
     */
    changeEditorFocus(status: boolean): void {
        this.editorOnFocus = status;
    }

    /**
     * Listen to model changes and calls onChange method with editorContent value..
     * @type {boolean}.
     */
    onModelChange(): void {
        this.onChange(this.editorContent);
    }

    /**
     * Calls this function with new value.
     * When user writes something in the component it needs to know that new data entered in the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this function when user leaves chosen component.
     * It is needed for validation.
     */
    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    /**
     * (Optional)
     * The method will be called by the control when the [disabled] state changes.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * This method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        this.editorContent = obj;
    }

    onTouched = () => {};
    private onChange: (value: any) => void = () => {};
}
