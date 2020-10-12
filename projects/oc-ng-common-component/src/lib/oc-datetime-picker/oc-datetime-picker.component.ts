import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'oc-datetime-picker',
  templateUrl: './oc-datetime-picker.component.html',
  styleUrls: ['./oc-datetime-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OcDatetimePickerComponent),
    multi: true
  }],
})
export class OcDatetimePickerComponent implements OnInit, ControlValueAccessor {

  @Input()
  set value(val) {
    this.date = val ? new Date(val) : null;
    this.emitChanges(this.date);
  }

  /** Set 'disable' state for input */
  @Input() disabled: boolean = false;

  @Input()
  settings: any;

  @Input()
  type: 'datetime' | 'date';

  date: Date;
  hourValue: number = 0;
  minuteValue: number = 0;
  monthDays: Array<any> = [];
  today: Date = new Date();

  private calDaysInMonth: Array<any> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
      'December'
    ],
    cal_months_labels_short: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    closeOnSelect: true
  };

  private onTouched = () => {};
  private onChange: (value: any) => void = () => {};

  constructor() {}

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    if (!this.date) {
      this.date = null;
    } else {
      this.initCal();
    }
  }

  initCal() {
    this.date = this.date ? this.date : new Date();
    this.initDate(this.date);
    this.monthDays = this.generateDays(this.date);
  }

  initDate(val: any) {
    this.date = new Date(val);

    this.hourValue = this.date.getHours();
    this.minuteValue = this.date.getMinutes();
  }

  generateDays(date: Date) {
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
    const dateArr = [];
    let dateRow = [];
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
        dateRow.push({ day: dateCell, date: new Date(month + 1 + '-' + dateCell + '-' + date.getFullYear()) });
      }
      // stop making rows if we've run out of days
      if (day > monthLength) {
        dateArr.push(dateRow);
        // break;
      } else {
        dateArr.push(dateRow);
      }
    }
    return dateArr;
  }

  getMonthLength(month: number, year: number) {
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

  setTimeView() {
    this.date.setHours(this.hourValue);
    this.date.setMinutes(this.minuteValue);
    this.date = new Date(this.date);
  }

  setDay(evt: any) {
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

  prevMonth(e: any) {
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

  nextMonth(e: any) {
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

  incHour() {
    if (this.hourValue < 23) {
      this.hourValue += 1;
    } else {
      this.hourValue = 0;
    }
    this.setTimeView();
  }

  decHour() {
    if (this.hourValue > 1) {
      this.hourValue -= 1;
    } else {
      this.hourValue = 23;
    }
    this.setTimeView();
  }

  onHourChange() {
    console.log('on hour change!');
    setTimeout(() => {
      if (this.hourValue > 12) {
        this.hourValue = 12;
      }
      if (this.hourValue < 1) {
        this.hourValue = 1;
      }
      this.setTimeView();
    }, 100);
  }

  incMinutes() {
    if (this.minuteValue < 59) {
      this.minuteValue += 1;
    } else {
      this.minuteValue = 0;
    }
    this.setTimeView();
  }

  decMinutes() {
    if (this.minuteValue > 0) {
      this.minuteValue -= 1;
    } else {
      this.minuteValue = 59;
    }
    this.setTimeView();
  }

  onMinChange() {
    setTimeout(() => {
      if (this.minuteValue > 59) {
        this.minuteValue = 59;
      }
      if (this.minuteValue < 0) {
        this.minuteValue = 0;
      }
      this.setTimeView();
    }, 100);
  }

  done(event?) {
    if (!event) {
      this.emitChanges(this.date);
    }
  }

  composeDate(date: Date) {
    return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
  }

  clearDate() {
    this.date = null;
    this.done();
  }

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

  get isDateTime(): boolean {
    return this.type === 'datetime';
  }
}
