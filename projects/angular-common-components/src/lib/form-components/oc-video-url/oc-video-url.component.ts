import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'oc-video-url',
    templateUrl: './oc-video-url.component.html',
    styleUrls: ['./oc-video-url.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcVideoUrlComponent),
            multi: true,
        },
    ],
})
export class OcVideoUrlComponent implements ControlValueAccessor {
    /**
     * Placeholder text for video url input.
     * @type {string}.
     */
    @Input() placeholder: string = '';

    /**
     * List of classes which can be attached to the current list.
     * @type {string}.
     */
    @Input() class: string = '';

    /**
     * Sets `disable` state for input.
     * @type {boolean}.
     */
    @Input() disabled: boolean = false;

    /**
     * Type of the input. Can be `text` or `email`.
     * @type {string}.
     * @default 'text'.
     */
    @Input() inputType: 'text' | 'email' = 'text';

    /**
     * (Required)
     * Video url setter.
     * @type {string}.
     * Calls `onChange()` and `verifyVideoUrl()` methods.
     */
    @Input() set value(val: string) {
        this.videoUrl = val;
        this.onChange(this.videoUrl);
        this.verifyVideoUrl();
    }

    videoUrl: string;
    isValidUrl: boolean = false;

    /**
     * Emits changes of the video Url.
     * Calls `onChange()` and `verifyVideoUrl()` methods.
     */
    emitChanges(): void {
        this.onChange(this.videoUrl);
        this.verifyVideoUrl();
    }

    /**
     * Calls this function to verify the current video Url.
     * The value validates through the regex and function returns boolean variable.
     */
    verifyVideoUrl(): void {
        const reg = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
        this.isValidUrl = reg.test(this.videoUrl);
    }

    /**
     * Register touch action on focus event.
     * Fires when the component input gets focused.
     */
    onFocus(): void {
        this.onTouched();
    }

    /**
     * Calls this method with new value, when a user writes something in the component.
     * It needs to be checked that new data has entered the control.
     */
    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    /**
     * Calls this method when an input is unfocused.
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
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside the component,
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        this.videoUrl = obj;
        this.verifyVideoUrl();
    }

    private onTouched = () => {};
    private onChange: (value: any) => void = () => {};
}
