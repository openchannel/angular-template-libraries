import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OcDropboxComponent } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-tags',
    templateUrl: './oc-tags.component.html',
    styleUrls: ['./oc-tags.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcTagsComponent),
            multi: true,
        },
    ],
})
export class OcTagsComponent implements OnInit, ControlValueAccessor, OnChanges {
    @Input() set value(val: any) {
        this.resultTags = val || [];
        this.onChange(this.resultTags);
    }

    @ViewChild('dropBox') dropbox: OcDropboxComponent;

    /** Placeholder */
    @Input() placeholder: string;

    /**
     * availableTags (optional) - It is list tags for the dropbox. Users can choice tags of this list.
     * When this list is empty dropbox not shows.
     * Default: empty string []
     */
    @Input() availableTags: string[] = [];

    /**
     * Set type of tags values.
     * Can be 'string', 'boolean' or 'number'
     * Default: 'string'
     */
    @Input() tagsType: 'string' | 'boolean' | 'number' = 'string';

    /** tag from the input text field */
    currentTag = '';

    /** tags for showing in the drop box */
    dropBoxTags = [];

    /** user tags */
    resultTags = [];

    constructor() {}

    ngOnInit(): void {
        this.dropBoxTags = this.findAvailableDropBoxTags();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.availableTags && changes.availableTags.previousValue !== changes.availableTags.currentValue) {
            this.dropBoxTags = this.findAvailableDropBoxTags();
        }
    }

    addCurrentTagToResultList(): void {
        if (this.currentTag) {
            this.addTagToResultList(this.normalizeTag(this.currentTag));
            this.dropbox.outputSelectedItem = '';
        }
    }

    addTagToResultList(tag: string): void {
        if (!this.resultTags.includes(tag)) {
            this.resultTags = [...this.resultTags, tag];
            this.updateComponentData();
            this.currentTag = '';
        }
    }

    normalizeTag(tag: string): any {
        if (this.tagsType === 'number') {
            return isNaN(Number(tag)) ? tag : Number(tag);
        }
        if (this.tagsType === 'boolean') {
            try {
                return JSON.parse(tag);
            } catch (e) {
                return tag.trim();
            }
        }
        return tag.trim();
    }

    onInputChange(text: string): void {
        this.currentTag = text;
    }

    removeTag(tagIndex: number): void {
        this.resultTags.splice(tagIndex, 1);
        this.updateComponentData();
    }

    updateComponentData(): void {
        this.dropBoxTags = this.findAvailableDropBoxTags();
        this.updateOutput();
    }

    findAvailableDropBoxTags(): string[] | number[] | boolean[] {
        let mappedValues: any[] = this.availableTags;
        if (this.tagsType === 'number') {
            mappedValues = this.availableTags.map(Number);
        }
        if (this.tagsType === 'boolean') {
            mappedValues = this.availableTags.map(value1 => JSON.parse(value1));
        }
        return mappedValues.filter(tag => !this.resultTags.includes(tag));
    }

    updateOutput(): void {
        this.onChange(this.resultTags);
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
    setDisabledState(isDisabled: boolean): void {}
    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        if (obj && obj.length > 0) {
            if (this.tagsType === 'number' || this.tagsType === 'boolean') {
                this.resultTags = obj;
            } else {
                this.resultTags = obj.filter(tag => tag && tag.trim().length > 0);
            }
        } else {
            this.resultTags = [];
        }
        this.dropBoxTags = this.findAvailableDropBoxTags();
    }

    private onTouched = () => {};
    private onChange: (value: any) => void = () => {};
}
