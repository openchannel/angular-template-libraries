import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {OcSelectExpandableComponent} from './oc-select-expandable.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {Component, Input} from "@angular/core";

@Component({
  selector: 'svg-icon',
  template: '',
})
export class MockSvgIconComponent {
  @Input() src: string = '';
}

describe('OcSelectExpandableComponent', () => {
  let component: OcSelectExpandableComponent;
  let fixture: ComponentFixture<OcSelectExpandableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OcSelectExpandableComponent, MockSvgIconComponent],
      imports: [NgbModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcSelectExpandableComponent);
    component = fixture.componentInstance;
    component.title = 'Test Select';
    component.selectModels = [
      {
        label: 'Category 1',
        checked: false,
      },
      {
        label: 'Category 2',
        checked: false,
      },
      {
        label: 'Category 3',
        checked: false,
      },
      {
        label: 'Category 4',
        checked: true,
      }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show data', () => {
    component.isCollapsed = false;
    component.collapsedOnInit = false;

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h6')).nativeElement;
    const selectLabel = fixture.debugElement.query(By.css('span')).nativeElement;
    const checkedSelect = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;

    expect(title.textContent).toContain('Test Select');
    expect(selectLabel.textContent).toContain('Category 1');
    expect(checkedSelect.value).toBeTruthy();
  });

  it('should emit select models on list click', () => {
    component.isCollapsed = false;
    component.collapsedOnInit = false;

    spyOn(component.selectModelsChange, 'emit');
    fixture.detectChanges();

    const firstItem = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;

    firstItem.click();
    fixture.detectChanges();

    expect(component.selectModelsChange.emit).toHaveBeenCalledWith([
      {
        label: 'Category 1',
        checked: true,
      },
      {
        label: 'Category 2',
        checked: false,
      },
      {
        label: 'Category 3',
        checked: false,
      },
      {
        label: 'Category 4',
        checked: true,
      }
    ]);
  });

  it('should collapse list', () => {
    component.isCollapsed = false;
    component.collapsedOnInit = false;

    fixture.detectChanges();

    const triggerCollapse = fixture.debugElement.query(By.css('h6')).nativeElement;
    triggerCollapse.click();

    fixture.detectChanges();

    expect(component.isCollapsed).toBeTruthy();
  });
});
