import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'oc-app-category-select',
  templateUrl: './oc-app-category-select.component.html',
  styleUrls: ['./oc-app-category-select.component.scss']
})
export class OcAppCategorySelectComponent implements OnInit {


  @Input() predefinedValArr;

  @Output() categoryCahnge = new EventEmitter<any>();

  @Input() defaultBlankValue = 'Select Category';

  @Input() addButtonLable = 'Add Category';

  @Input() ngModel;

  @Output() selectionChange = new EventEmitter();


  @Input() addIconUrl;
  @Input() closeIconUrl;

  currentSelectedOption = {key: '', value: ''};

  constructor() {
  }

  ngOnInit(): void {

  }

  onSelectionChange($event) {
    this.currentSelectedOption = $event;
    this.selectionChange.emit($event);
  }

  addCategory() {
    if (this.currentSelectedOption && this.currentSelectedOption.key) {
      const index = this.predefinedValArr.map(val => val.value).indexOf(this.currentSelectedOption.value);
      if (index !== -1) {
        this.predefinedValArr.splice(index, 1);
      }
      this.ngModel.push(this.currentSelectedOption.value);
      this.currentSelectedOption = {key: '', value: ''};
      this.categoryCahnge.emit({
        predefinedArr: this.predefinedValArr,
        selectedValArr: this.ngModel
      });
    }
  }

  removeCategory(categoryToBeResolved, idx) {
    this.predefinedValArr.push({key: categoryToBeResolved, value: categoryToBeResolved});
    this.ngModel.splice(idx, 1);
    this.categoryCahnge.emit({predefinedArr: this.predefinedValArr, selectedValArr: this.ngModel});
  }
}
