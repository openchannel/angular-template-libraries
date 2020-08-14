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

  @Input() addButtonLable = 'Add Category';

  @Input() selectedValuesArr;

  @Output() selectionChange = new EventEmitter();


  @Input() addIconUrl;
  @Input() closeIconUrl;
  
  currentSelectedVal='';

  constructor() { }
  
  ngOnInit(): void {
  
  }

  onSelectionChange($event){
    this.currentSelectedVal=$event;
    this.selectionChange.emit($event);
  }

  addCategory(){
    if(this.currentSelectedVal && this.currentSelectedVal.trim().length>0){
      var index = this.predefinedValArr.map(val => val.value).indexOf(this.currentSelectedVal);
      if (index !== -1) {
        this.predefinedValArr.splice(index, 1);
      }
      this.selectedValuesArr.push(this.currentSelectedVal);
      this.currentSelectedVal=''
      this.categoryCahnge.emit({predefinedArr: this.predefinedValArr, selectedValArr: this.selectedValuesArr});
      // this.addNewCategory.emit(this.currentSelectedVal);
    }
  }

  removeCategory(catgoryToBeReoved, idx){
    this.predefinedValArr.push({key: catgoryToBeReoved,value: catgoryToBeReoved});
    this.selectedValuesArr.splice(idx,1);
    this.categoryCahnge.emit({predefinedArr: this.predefinedValArr, selectedValArr: this.selectedValuesArr});
  }
}
