import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * Special button component. Contains text and spinner.
 * Can be different type (`primary`, `secondary`, `link`, `danger` or `none`).
 */
@Component({
    selector: 'oc-button',
    templateUrl: './oc-button.component.html',
    styleUrls: ['./oc-button.component.scss'],
})
export class OcButtonComponent implements OnChanges {
    /**
     * Text content of the button.
     * @default empty string
     */
    @Input() text: string = '';
    /**
     * Disable current button. User can't interact with this button.
     * Also, disabled button style will be applied.
     * Button is active by default.
     * @default false
     */
    @Input() disabled: boolean = false;
    /**
     * Set custom inline style to button.
     * @default: empty
     *
     * ## Example for Docs
     * ``
     * <oc-button [style]="'width: 120px; color: green;'"></oc-button>
     * ``
     * @example
     * <oc-button [style]="'width: 120px; color: green;'"></oc-button>
     */
    @Input() style: string = '';
    /**
     * Set custom class from main style.scss file for the button.
     * ## Example for Docs
     * ``
     * <oc-button customClass=".example-class"></oc-button>.
     * style.scss:
     * .example-class {
     *   color: green;
     *   background: #fff;
     * }
     * ``
     * @example
     * <oc-button customClass=".example-class"></oc-button>.
     * style.scss:
     * .example-class {
     *     color: green;
     *     background: #fff;
     * }
     */
    @Input() customClass: string = '';
    /**
     * (Optional)
     * Template for the button content. If not set - default text or spinner will be applied.
     * @default: empty
     */
    @Input() customTemplate: TemplateRef<any>;
    /**
     * Sets process status to the button. If it's `true` - button will show the spinner and become inactive.
     * @default false
     */
    @Input() process: boolean = false;
    /**
     * Sets the button type which changing button style.
     * @param type type of the button. `primary` - main button, `link` - turns button to the link view,
     * `danger` - applies danger style, `none` - default button.
     */
    @Input() set type(type: 'primary' | 'secondary' | 'link' | 'danger' | 'none') {
        this.buttonType = type;
        this.buttonTypeClass = type !== 'none' ? `oc-button_${this.buttonType}` : null;
    }

    /** variable which includes a button type */
    buttonType: string = 'primary';
    /** switching button style according to the button `type` */
    buttonTypeClass: string;
    /** unique pointer for the spinner of current button */
    spinnerName: string;

    constructor(private spinner: NgxSpinnerService) {
        this.spinnerName = Math.random().toString();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.process && changes.process.previousValue !== changes.process.currentValue) {
            this.checkSpinner();
        }
    }

    /**
     * Function that checking button `type` and `process` status.
     * Applies spinner if button is not `link` type and process status set to `true`.
     */
    checkSpinner(): void {
        if (this.process && this.buttonType !== 'link') {
            this.spinner.show(this.spinnerName, {
                color: null,
                bdColor: null,
                type: 'ball-spin',
                size: 'small',
                fullScreen: false,
            });
        } else {
            this.spinner.hide(this.spinnerName);
        }
    }
}
