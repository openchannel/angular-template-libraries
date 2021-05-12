import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { OcDropdownComponent } from './oc-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('OcDropdownComponent', () => {
  let component: OcDropdownComponent;
  let fixture: ComponentFixture<OcDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OcDropdownComponent ],
      imports: [NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.options = [
      {label: 'Select 1', value: 'select1'},
      {label: 'Select 2', value: 'select2'},
      {label: 'Select 3', value: 'select3'}
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change and emit selected value', () => {
    const dropdownSelect = fixture.nativeElement.querySelector('#dropdownManual');

    spyOn(component.selectedChange, 'emit');
    dropdownSelect.click();
    fixture.detectChanges();

    const dropdownButtonSelected = fixture.nativeElement.querySelectorAll('.dropdown-item')[0];
    dropdownButtonSelected.click();

    expect(component.selected).toEqual({label: 'Select 1', value: 'select1'});
    expect(component.selectedChange.emit).toHaveBeenCalledWith({label: 'Select 1', value: 'select1'});
  });

  it('should change a title', () => {
    component.title = 'Some title of';
    component.selected = {label: 'Select 1', value: 'select1'};

    const dropdownSelect = fixture.nativeElement.querySelector('#dropdownManual');
    fixture.detectChanges();

    expect(dropdownSelect.textContent).toContain('Some title of Select 1');
  });
});
