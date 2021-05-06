import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcDatetimePickerComponent} from './oc-datetime-picker.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MockSvgIconComponent} from 'oc-ng-common-component/src/mock/mock';
import {OcButtonComponent} from 'oc-ng-common-component/src/lib/common-components';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgxSpinnerModule} from 'ngx-spinner';


describe('OcDatetimePickerComponent', () => {
  let component: OcDatetimePickerComponent;
  let fixture: ComponentFixture<OcDatetimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcDatetimePickerComponent, MockSvgIconComponent, OcButtonComponent],
      imports: [FormsModule, NgbModule, HttpClientTestingModule, NgxSpinnerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  const dateStr = 'Fri Oct 30 2020 11:51:07';

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain date value', () => {
    component.writeValue(dateStr);
    expect(component.date).toEqual(new Date(dateStr));
  });

  it('should set date value', () => {
    component.value = dateStr;
    expect(component.date).toEqual(new Date(dateStr));
  });

  it('should contain date value in date container', async () => {
    component.writeValue(dateStr);
    component.type = 'date';
    component.settings = {format: 'dd/MM/yyyy'};

    fixture.detectChanges();
    const dateContainer = fixture.nativeElement.querySelector('.date-picker__format-text');

    await fixture.whenStable().then(() => {
      expect(dateContainer.textContent.trim()).toEqual('30/10/2020');
    });
  });

  it('should change date value format', async () => {
    component.writeValue(dateStr);
    component.type = 'datetime';
    component.settings = {format: 'dd/MM/yyyy HH:mm'};

    fixture.detectChanges();
    const dateContainer = fixture.nativeElement.querySelector('.date-picker__format-text');

    await fixture.whenStable().then(() => {
      expect(dateContainer.textContent.trim()).toEqual('30/10/2020 11:51');
    });
  });

  it('datepicker should be disabled', async () => {
    component.setDisabledState(true);

    const pickerButton = fixture.nativeElement.querySelector('#datePickerDD');

    pickerButton.click();
    fixture.detectChanges();

    const calendar = fixture.nativeElement.querySelector('.dropdown-menu.show');

    await fixture.whenStable().then(() => {
      expect(calendar).toBeFalsy();
    });
  });

  it('should call onChange with value', async () => {
    const onChangeFunc = jest.fn();
    component.registerOnChange(onChangeFunc);

    component.emitChanges(new Date(dateStr));

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe(new Date(dateStr).valueOf());
  });

  it('datepicker should change month to next', async () => {
    const nextMonthStr = new Date('Fri Nov 30 2020 11:51:07');
    component.value = dateStr;
    const pickerButton = fixture.nativeElement.querySelector('#datePickerDD');

    pickerButton.click();
    fixture.detectChanges();

    const nextMonthBtn = fixture.nativeElement.querySelector('#nextMonth');
    nextMonthBtn.click();

    await fixture.whenStable().then(() => {
      expect(component.date).toEqual(nextMonthStr);
    });
  });

  it('datepicker should change month to prev', async () => {
    const prevMonthStr = new Date('Fri Sep 30 2020 11:51:07');
    component.value = dateStr;
    const pickerButton = fixture.nativeElement.querySelector('#datePickerDD');

    pickerButton.click();
    fixture.detectChanges();

    const prevMonthBtn = fixture.nativeElement.querySelector('#prevMonth');
    prevMonthBtn.click();

    await fixture.whenStable().then(() => {
      expect(component.date).toEqual(prevMonthStr);
    });
  });

  it('datepicker should change time', async () => {
    const timeChanged = new Date(dateStr);
    timeChanged.setHours(timeChanged.getHours() - 1, timeChanged.getMinutes() + 1);

    component.value = dateStr;
    component.type = 'datetime';

    fixture.nativeElement.querySelector('#datePickerDD').click();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('#hourDec').click();
    fixture.nativeElement.querySelector('#minInc').click();
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(component.date).toEqual(timeChanged);
    });
  });

  it('should check leap year', () => {
    component.value =  new Date(dateStr).setMonth(1, 20);

    component.ngOnInit();

    const lastDayOfFeb = component.monthDays.find(week => {
      return week.find(day => day.day === 29 && day.date.getMonth() === 1);
    });

    expect(component.monthDays.length).toBeGreaterThan(0);
    expect(lastDayOfFeb).toBeTruthy();
  });

  it('should change year on January', async () => {
    const prevYearString = new Date('Fri Dec 30 2019 11:51:07');
    component.value = 'Fri Jan 30 2020 11:51:07';

    const pickerButton = fixture.nativeElement.querySelector('#datePickerDD');

    pickerButton.click();
    fixture.detectChanges();

    const prevMonthBtn = fixture.nativeElement.querySelector('#prevMonth');
    prevMonthBtn.click();

    await fixture.whenStable().then(() => {
      expect(component.date).toEqual(prevYearString);
    });
  });
});
