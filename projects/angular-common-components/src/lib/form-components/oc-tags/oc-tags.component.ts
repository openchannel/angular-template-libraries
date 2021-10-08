import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OcDropboxComponent } from '@openchannel/angular-common-components/src/lib/common-components';

@Component({
    selector: 'oc-tags',
    templateUrl: './oc-tags.component.html',
    styleUrls: ['./oc-tags.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcTagsComponent),
            multi: true,
        },
    ],
})
export class OcTagsComponent implements OnInit, ControlValueAccessor, OnChanges {
    /**
     * A dropbox element. Contains dropbox tags.
     * Uses [OcDropboxComponent]{@link OcDropboxComponent} model.
     */
    @ViewChild('dropBox') dropbox: OcDropboxComponent;

    /**
     * Sets an array of tags.
     * Calls `onChange()` method.
     * @type {*}.
     */
    @Input() set value(val: any) {
        this.resultTags = val || [];
        this.onChange(this.resultTags);
    }

    /**
     * Placeholder text for tags input.
     * @type {string}.
     */
    @Input() placeholder: string;

    /**
     * Tags available for the dropbox. Users can chose tags from this list.
     * When this list is empty dropbox is hidden.
     * @type {string[]}
     * Default: empty.
     */
    @Input() availableTags: string[] = [];

    /**
     * Set type of tags values.
     * Can be `"string"`, `"boolean"` or `"number"`.
     * @type {string}.
     * @default: 'string'.
     */
    @Input() tagsType: 'string' | 'boolean' | 'number' = 'string';

    /**
     * The current tag from the input text field.
     * @type {string}.
     */
    currentTag = '';

    /**
     * The list of tags to be shown in the dropbox.
     * @type {*[]}.
     */
    dropBoxTags: any[] = [];

    /**
     * The list of tags after adding/removing/searching by a user.
     * Is listened and updated by onChange method.
     * @type {*[]}.
     */
    resultTags: any[] = [];

    ngOnInit(): void {
        this.dropBoxTags = this.findAvailableDropBoxTags();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.availableTags && changes.availableTags.previousValue !== changes.availableTags.currentValue) {
            this.dropBoxTags = this.findAvailableDropBoxTags();
        }
    }

    /**
     * Takes a current tag as a parameter.
     * Checks if result tags list does not include a current tag.
     * Adds a current tag to the list of result tags.
     * Updates component data.
     * Removes the current tag value.
     */
    addTagToResultList(rawTag: string): void {
        const tag = this.normalizeTag(rawTag);
        if (tag === '') {
            return;
        }
        if (!this.resultTags.includes(tag)) {
            this.resultTags = [...this.resultTags, tag];
            this.updateComponentData();
            this.currentTag = '';
            this.dropbox.outputSelectedItem = '';
        }
    }

    /**
     * Takes a current tag as a parameter.
     * Checks the current tag type.
     * Returns the trimmed version of tag or null.
     */
    normalizeTag(tag: number | boolean | string): number | boolean | string {
        // return empty string, when tag is empty.
        if (typeof tag === 'string' && tag.trim().length === 0) {
            return '';
        }
        if (this.tagsType === 'number') {
            return isNaN(Number(tag)) ? tag : Number(tag);
        }
        if (this.tagsType === 'boolean') {
            try {
                return JSON.parse(String(tag));
            } catch (e) {
                return String(tag).trim();
            }
        }
        return String(tag).trim();
    }

    /**
     * Checks the changes in text input.
     * Assigns new value to the current tag.
     */
    onInputChange(text: string): void {
        this.currentTag = text;
    }

    /**
     * Takes tag index as a parameter.
     * Removes specific tag by tag index from result tags array.
     * Updates component data.
     */
    removeTag(tagIndex: number): void {
        this.resultTags.splice(tagIndex, 1);
        this.updateComponentData();
    }

    /**
     * Updates dropbox tags list by calling findAvailableDropBoxTags() method.
     * Calls updateOutput() method.
     */
    updateComponentData(): void {
        this.dropBoxTags = this.findAvailableDropBoxTags();
        this.updateOutput();
    }

    /**
     * Takes array as a parameter.
     * Checks the tags types and fills the mappedValues array with new values according to each type.
     * Returns mappedValues filtered with the tags which are currently not in the result tags list.
     */
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

    /**
     * Updates the registered private onChange() method.
     * Passes the result tags list.
     */
    updateOutput(): void {
        this.onChange(this.resultTags);
    }

    /**
     * Calls this function with new value. When user writes something in the component,
     * it is needed to know that new data has entered the control.
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
    setDisabledState(isDisabled: boolean): void {}

    /**
     * This method will be called by the control to pass the value to our component.
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
