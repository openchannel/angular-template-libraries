import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-tags',
    templateUrl: './oc-tags.component.html',
    styleUrls: ['./oc-tags.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => OcTagsComponent),
        multi: true
    }],
})
export class OcTagsComponent implements OnInit, ControlValueAccessor, OnChanges {

    constructor() {
    }

    /**
     * name (required) - Main component name.
     * Default : 'Options'.
     */
    @Input() title: string;

    /**
     * placeHolderInputName (required) - Name for the text input filed. When we add a custom tag.
     */
    @Input() placeHolderInputName: string = '';

    /**
     * placeHolderDropBoxName (required) - Name for the DropBox with available tags.
     */
    @Input() placeHolderDropBoxName: string = '';
    /**
     * required (optional) - Is the required result data. Show the red marker.
     * Default: false
     */
    @Input() required: boolean = false;
    /**
     * minCountTags (optional) - It is minimal count tags for getting the correct result. Show error message.
     * Default: null (skip this check)
     */
    @Input() minTagsCount: number;

    /**
     * maxTagsCount (optional) - It is maximal count tags for getting the correct result. Show error message.
     * Default: null (skip this check)
     */
    @Input() maxTagsCount: number = null;

    /**
     * availableTags (optional) - It is list tags for the dropbox. Users can choice tags of this list.
     * When this list is empty dropbox not shows.
     * Default: empty string []
     */
    @Input() availableTags: string [] = [];

    /**
     * defaultTags (optional) - It is list tags for automatically adding to the user tags list.
     * Default: empty string []
     */
    @Input() defaultTags = [];

    /**
     * minTagLength (optional) - It is the minimum count of a character for one tag.
     * Show error message, when total chars < minTagLength.
     * Default: one character.
     */
    @Input() minTagLength: number = 1;

    /**
     * maxTagLength (optional) - It is the maximum count of a character for one tag.
     * Show error message, when total chars > maxTagLength.
     * Default: unlimited.
     */
    @Input() maxTagLength: number = null;
    /**
     * Set type of tags values.
     * Can be 'string', 'boolean' or 'number'
     * Default: 'string'
     */
    @Input() tagsType: 'string' | 'boolean' | 'number' = 'string';

    @Input()
    set value(val) {
        this.resultTags = val;
        this.onChange(this.resultTags);
    }
    /**
     * updatingTags - It is get a result list of user tags.
     */
    @Output() updatingTags = new EventEmitter<string []>();

    /** tag from the input text field */
    currentTag = '';


    /** current error message */
    error: {
        field: 'minlength' | 'maxlength' | 'minElementsCount' | 'maxElementsCount'
          | 'booleanTagsValidator' | 'numberTagsValidator',
        params: { requiredLength?: number } | { requiredCount?: number } | { fieldTitle?: string }
    };

    /** tags for showing in the drop box */
    dropBoxTags = [];

    /** user tags */
    resultTags = [];

    /** correct result tags */
    validResult = false;

    private acceptableBooleanTags: string [] = ['true', 'false'];

    private onTouched = () => {};
    private onChange: (value: any) => void = () => {};

    ngOnInit(): void {
        this.applyDefaultTags();
        this.dropBoxTags = this.findAvailableDropBoxTags();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.availableTags && changes.availableTags.previousValue !== changes.availableTags.currentValue) {
            this.dropBoxTags = this.findAvailableDropBoxTags();
        }
    }

    applyDefaultTags(): void {
        this.defaultTags.forEach(tag => this.addTagToResultList(tag, true));
    }

    checkForBooleanType(tag): boolean {
        return this.acceptableBooleanTags.includes(tag);
    }

    addCurrentTagToResultList(): void {
        this.error = null;
        if (this.addTagToResultList(this.currentTag, false)) {
            this.currentTag = '';
        }
    }

    addTagToResultList(tag: string, skipErrorChecks: boolean): boolean {
        this.error = null;

        if (tag) {
            let tagNormalized;
            if (this.tagsType === 'number') {
                tagNormalized = tag;
            } else {
                tagNormalized = tag.trim();
            }
            if (!skipErrorChecks && !this.isTagLengthValid(tagNormalized)) {
                this.showTagLengthErrorMessage(tagNormalized);
                return false;
            } else if (!this.existTagInResultList(tagNormalized)) {
                switch (this.tagsType) {
                    case 'boolean':
                        if (this.checkForBooleanType(tagNormalized)) {
                            this.resultTags = [...this.resultTags, tagNormalized];
                            this.updateComponentData();
                            return true;
                        } else {
                            this.error = {field: 'booleanTagsValidator', params: {fieldTitle: this.title}};
                            return false;
                        }
                    case 'number':
                        if (!isNaN(Number(tagNormalized))) {
                            this.resultTags = [...this.resultTags, Number(tagNormalized)];
                            this.updateComponentData();
                            return true;
                        } else {
                            this.error = {field: 'numberTagsValidator', params: {fieldTitle: this.title}};
                        }
                        break;
                    default:
                        this.resultTags = [...this.resultTags, tagNormalized];
                        this.updateComponentData();
                        return true;
                }
            }
        }

        return false;
    }

    removeTag(tagIndex: number): void {
        this.error = null;
        this.resultTags.splice(tagIndex, 1);
        this.updateComponentData();
    }

    updateComponentData(): void {
        this.dropBoxTags = this.findAvailableDropBoxTags();
        this.createErrorMessageByCountTagsIfNeed();
        this.updateOutput();
    }

    existTagInResultList(currentTag: string): boolean {
        if (this.tagsType === 'number') {
            const tag = Number(currentTag);
            return this.resultTags.filter(t => tag === t).length > 0;
        } else {
            const tagNormalized = currentTag.toLowerCase();
            return this.resultTags.filter(t => tagNormalized === t.toLowerCase()).length > 0;
        }
    }

    isTagLengthValid(tag: string): boolean {
        const tagLength = tag.length;

        // check that tagLength is less than minimal
        if (this.minTagLength && tagLength < this.minTagLength) {
            return false;
        }

        if (this.maxTagLength && tagLength > this.maxTagLength) {
            return false;
        }

        return true;
    }

    showTagLengthErrorMessage(tag: string): void {
        const tagLength = tag.length;
        if (this.minTagLength && tagLength < this.minTagLength) {
            this.error = {field: 'minlength', params: {requiredLength: this.minTagLength}};
        }
        // todo string interpolation
        if (this.maxTagLength && this.maxTagLength < tagLength) {
            this.error = {field: 'maxlength', params: {requiredLength: this.maxTagLength}};
        }
    }

    createErrorMessageByCountTagsIfNeed(): void {
        const countTags = this.resultTags.length;
        if (this.minTagsCount && (countTags < this.minTagsCount)) {
            this.error = {field: 'minElementsCount', params: {requiredCount: this.minTagsCount}};
        }
        if (this.maxTagsCount && (countTags > this.maxTagsCount)) {
            this.error = {field: 'maxElementsCount', params: {requiredCount: this.maxTagsCount}};
        }
    }

    findAvailableDropBoxTags(): string [] {
        return this.availableTags.filter(tag => !this.existTagInResultList(tag));
    }

    changeCurrentTag(): void {
        this.error = null;
        this.showTagLengthErrorMessage(this.currentTag);
    }

    updateOutput(): void {
        this.onChange(this.resultTags);
        this.updatingTags.emit(this.resultTags);
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
        if (obj && obj.length > 0) {
            if (this.tagsType === 'number') {
                this.resultTags = obj;
            } else {
                this.resultTags = obj.filter(tag => tag && tag.trim().length > 0);
            }
        } else {
            this.resultTags = [];
        }
    }
}
