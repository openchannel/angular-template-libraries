import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DayOfMonth } from '../model/datetime.model';

/**
 * Component represents input with date and time picker.
 * Also this component supports `Abstract Control` format, so it can work with `ngModel` or `formControl`.
 * Can be a part of the `ngForm`.
 */
@Component({
    selector: 'oc-datetime-picker',
    templateUrl: './oc-datetime-picker.component.html',
    styleUrls: ['./oc-datetime-picker.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcDatetimePickerComponent),
            multi: true,
        },
    ],
})
export class OcDatetimePickerComponent implements OnInit, ControlValueAccessor {
    /**
     * Set value from AbstractControl, like `ngModel` or `formControl`.
     * This will set the main value of the component.
     * @default null
     */
    @Input() set value(val) {
        this.date = val ? new Date(val) : null;
        this.emitChanges(this.date);
    }

    /**
     * Placeholder text for datetime picker.
     * @type {string}.
     */
    @Input() placeholder: string = '';

    /** Set `disable` state for input. User can not interact with component and choose date */
    @Input() disabled: boolean = false;
    /**
     * Object of custom settings for the calendar. Can replace the default settings.
     *
     * `format: string` - format of display date, example: `"dd/MM/yyyy, HH:mm"`
     *
     * `cal_days_labels: string []` - array of short labels of days of a week.
     *
     * `cal_full_days_labels: string []` - array of long labels of days of a week.
     *
     * `cal_months_labels: string []` - array of labels of the all twelve month.
     *
     * `cal_months_labels_short: string []` - array of short labels of the all twelve month.
     *
     * `closeOnSelect: boolean` - config for the closing or not of the calendar after the date has been chosen.
     * `false` will not close calendar. Calendar closes by default.
     * @example
     * {
     *     format: 'dd/MM/yyyy, HH:mm',
     *     cal_days_labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
     *     cal_full_days_labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
     *     cal_months_labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
     *       'October', 'November', 'December'],
     *     cal_months_labels_short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
     *     closeOnSelect: true,
     * }
     */
    @Input() settings: any;
    /**
     * Type of datepicker and data display of a component.
     *
     * `date` - user can choose only date from the calendar.
     *
     * `datetime` - user can choose date and time from the calendar.
     */
    @Input() type: 'datetime' | 'date' = 'date';
    /** Main date value of the component */
    date: Date;
    /** String for displaying hours */
    hourStr: string;
    /** Hour counter */
    hourValue: number = 0;
    /** String for displaying minutes */
    minuteStr: string;
    /** Minute counter */
    minuteValue: number = 0;
    /** Array for displaying day of month in the calendar  */
    monthDays: DayOfMonth[][] = [];
    /** Date in this moment of time */
    today: Date = new Date();
    /**
     * Quantity of days in each month.
     * @private
     */
    private calDaysInMonth: any[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    /**
     * Default settings for the calendar.
     * @private
     */
    private defaultSettings = {
        format: 'dd/MM/yyyy, HH:mm',
        cal_days_labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        cal_full_days_labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        cal_months_labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        cal_months_labels_short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        closeOnSelect: true,
    };

    ngOnInit(): void {
        this.settings = { ...this.defaultSettings, ...this.settings };
        if (!this.date) {
            this.date = null;
        } else {
            this.initCal();
        }
    }

    /**
     * Checking the component type.
     */
    get isDateTime(): boolean {
        return this.type === 'datetime';
    }

    /**
     * Init the calendar. Fill current date. Fill month data.
     */
    initCal(): void {
        this.date = this.date ? this.date : new Date();
        this.initDate(this.date);
        this.monthDays = this.generateDays(this.date);
    }

    /**
     * Init hours and minutes
     * @param val date value
     */
    initDate(val: any): void {
        this.date = new Date(val);

        this.hourValue = this.date.getHours();
        this.minuteValue = this.date.getMinutes();
        this.hourStr = this.hourValue.toString();
        this.minuteStr = this.minuteValue.toString();
    }

    /**
     * Generating days for month.
     * @param date current date
     */

    // prettier-ignore
    generateDays(date: Date): DayOfMonth[][] { // NOSONAR
        let month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1);
        const startingDay = firstDay.getDay();
        const monthLength = this.getMonthLength(month, year);

        let prevMonthDate;
        if (month === 0) {
            prevMonthDate = new Date(year - 1, 11, 1);
        } else {
            prevMonthDate = new Date(year, month - 1, 1);
        }

        month = prevMonthDate.getMonth();
        const prevMonthLength = this.getMonthLength(prevMonthDate.getMonth(), prevMonthDate.getFullYear());

        let day = prevMonthLength - (startingDay === 0 ? 7 : startingDay) + 2;
        const dateArr: DayOfMonth[][] = [];
        let dateRow: DayOfMonth[] = [];
        // this loop is for is weeks (rows)
        for (let i = 0; i < 6; i++) {
            // this loop is for weekdays (cells)
            dateRow = [];
            for (let j = 1; j <= 7; j++) {
                if (j % 7 === startingDay && i === 0) {
                    day = 1;
                    month = date.getMonth();
                }
                if (day > monthLength && i > 0) {
                    day = 1;
                    if (month === 11) {
                        month = 0;
                    } else {
                        month++;
                    }
                }
                const dateCell = day;
                day++;
                dateRow.push({ day: dateCell, date: new Date(date.getFullYear(), month, dateCell) });
            }
            dateArr.push(dateRow);
        }
        return dateArr;
    }

    /**
     * Getting quantity of days in current month for and special calculating for the February in a leap year.
     * @param month current month number
     * @param year current year number
     */
    getMonthLength(month: number, year: number): number {
        let monthLength = this.calDaysInMonth[month];

        // compensate for leap year
        if (month === 1) {
            // February only!
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                monthLength = 29;
            }
        }
        return monthLength;
    }

    /**
     * Setting current time view
     */
    setTimeView(): void {
        this.date.setHours(this.hourValue);
        this.date.setMinutes(this.minuteValue);
        this.date = new Date(this.date);
    }

    /**
     * Set chosen day in the calendar.
     * @param evt clicked element
     */
    setDay(evt: any): void {
        if (evt.target.innerHTML) {
            const selectedDay = new Date(evt.target.getAttribute('data-label'));

            if (selectedDay.getMonth() !== this.date.getMonth()) {
                return;
            }

            this.date = new Date(selectedDay);

            if (this.isDateTime) {
                this.setTimeView();
            }

            if (this.settings.closeOnSelect) {
                this.emitChanges(this.date);
            }
        }
    }

    /**
     * Switch month in the calendar to previous.
     * @param e clicked switcher
     */
    prevMonth(e: any): void {
        e.stopPropagation();
        if (this.date.getMonth() === 0) {
            this.date.setMonth(11);
            this.date.setFullYear(this.date.getFullYear() - 1);
        } else {
            const prevMonthLength = this.getMonthLength(this.date.getMonth() - 1, this.date.getFullYear());
            const currentDate = this.date.getDate();
            if (currentDate > prevMonthLength) {
                this.date.setDate(prevMonthLength);
            }
            this.date.setMonth(this.date.getMonth() - 1);
        }
        this.date = new Date(this.date);
        this.monthDays = this.generateDays(this.date);
    }

    /**
     * Switch month in the calendar to next.
     * @param e clicked switcher
     */
    nextMonth(e: any): void {
        e.stopPropagation();
        if (this.date.getMonth() === 11) {
            this.date.setMonth(0);
            this.date.setFullYear(this.date.getFullYear() + 1);
        } else {
            const nextMonthLength = this.getMonthLength(this.date.getMonth() + 1, this.date.getFullYear());
            const currentDate = this.date.getDate();
            if (currentDate > nextMonthLength) {
                this.date.setDate(nextMonthLength);
            }
            this.date.setMonth(this.date.getMonth() + 1);
        }
        this.date = new Date(this.date);
        this.monthDays = this.generateDays(this.date);
    }

    /** Incrementation of the hour value. Updating time view */
    incHour(): void {
        if (this.hourValue < 23) {
            this.hourValue += 1;
        } else {
            this.hourValue = 0;
        }
        this.hourStr = this.hourValue.toString();
        this.setTimeView();
    }

    /** Decrementation of the hour value. Updating time view */
    decHour(): void {
        if (this.hourValue > 1) {
            this.hourValue -= 1;
        } else if (this.hourValue === 0) {
            this.hourValue = 23;
        } else {
            this.hourValue = 0;
        }
        this.hourStr = this.hourValue.toString();
        this.setTimeView();
    }

    /**
     * Catching changes in input field of hours. Updating hours with new values.
     * @param event input event
     */
    onHourChange(event: any): void {
        const inputData = event.target.value;
        this.hourValue = Number.parseInt(inputData, 10);

        if (!inputData) {
            this.hourValue = 0;
        } else {
            this.hourStr = inputData;
        }
        if (this.hourValue < 1 || this.hourValue > 23) {
            this.hourValue = 0;
        }
        this.hourStr = this.hourValue.toString();
        this.setTimeView();
    }

    /** Incrementation of the minutes value. Updating time view */
    incMinutes(): void {
        if (this.minuteValue < 59) {
            this.minuteValue += 1;
        } else {
            this.minuteValue = 0;
        }
        this.minuteStr = this.minuteValue.toString();
        this.setTimeView();
    }

    /** Decrementation of the minutes value. Updating time view */
    decMinutes(): void {
        if (this.minuteValue > 0) {
            this.minuteValue -= 1;
        } else {
            this.minuteValue = 59;
        }
        this.minuteStr = this.minuteValue.toString();
        this.setTimeView();
    }

    /**
     * Catching changes in input field of hours. Updating hours with new values.
     * @param event input event
     */
    onMinChange(event: any): void {
        const inputData = event.target.value;
        this.minuteValue = Number.parseInt(inputData, 10);
        if (!inputData) {
            this.minuteValue = 0;
        } else {
            this.minuteStr = inputData;
        }
        if (this.minuteValue > 59) {
            this.minuteValue = 59;
        }
        if (this.minuteValue < 0) {
            this.minuteValue = 0;
        }
        this.minuteStr = this.minuteValue.toString();
        this.setTimeView();
    }

    /**
     * Catching changes in calendar dropdown. Emits changed date after calendar has been closed.
     * @param event current calendar opened\closed status
     */
    done(event?: boolean): void {
        if (!event) {
            this.emitChanges(this.date);
        }
    }

    /**
     * Composing date string for the `data-label` attribute
     * @param date date parameter for formatting
     */
    composeDate(date: Date): string {
        return date.toDateString();
    }

    // clearDate(): void {
    //     this.date = null;
    //     this.done();
    // }

    /**
     * Emits new changes in model
     * @param newDate new model value
     */
    emitChanges(newDate: Date): void {
        this.onChange(newDate ? newDate.valueOf() : null);
    }

    /**
     * Register touch action
     */
    onFocus(): void {
        this.onTouched();
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
        this.disabled = isDisabled;
    }

    /**
     * this method will be called by the control to pass the value to our component.
     * It is used if the value is changed through the code outside
     * (setValue or changing the variable that ngModel is tied to),
     * as well as to set the initial value.
     */
    writeValue(obj: any): void {
        this.date = obj ? new Date(obj) : null;
    }

    private onTouched = () => {
        // nothing to do
    };

    private onChange: (value: any) => void = () => {
        // nothing to do
    };
}
