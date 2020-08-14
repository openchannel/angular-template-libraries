import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oc-app-category-select',
  templateUrl: './oc-app-category-select.component.html',
  styleUrls: ['./oc-app-category-select.component.scss']
})
export class OcAppCategorySelectComponent implements OnInit {

  

  @Input() predefinedValArr;

  @Output() categoryCahnge = new EventEmitter<any>();

  @Input() defaultBlankValue='Select Cateory';

  @Input() addButtonLable = 'Add Category'

  @Input() ngModel;

  @Output() selectionChange = new EventEmitter();


  @Input() addIconUrl;
  @Input() closeIconUrl;
  
  currentSelectedOption = {key:'', value:''};

  constructor() { }
  
  ngOnInit(): void {
  
  }

  onSelectionChange($event){
    this.currentSelectedOption=$event;
    this.selectionChange.emit($event);
  }

  addCategory(){
    if(this.currentSelectedOption && this.currentSelectedOption.key){
      var index = this.predefinedValArr.map(val => val.value).indexOf(this.currentSelectedOption.value);
      if (index !== -1) {
        this.predefinedValArr.splice(index, 1);
      }
      this.ngModel.push(this.currentSelectedOption.value);
      this.currentSelectedOption= {key:'', value:''};
      this.categoryCahnge.emit({predefinedArr: this.predefinedValArr, selectedValArr: this.ngModel});
      // this.addNewCategory.emit(this.currentSelectedVal);
    }
  }

  removeCategory(catgoryToBeReoved, idx){
    this.predefinedValArr.push({key: catgoryToBeReoved,value: catgoryToBeReoved});
    this.ngModel.splice(idx,1);
    this.categoryCahnge.emit({predefinedArr: this.predefinedValArr, selectedValArr: this.ngModel});
  }
}
