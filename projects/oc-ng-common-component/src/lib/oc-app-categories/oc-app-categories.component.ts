import { Component, OnInit, Input } from '@angular/core';
import { AppCategoryDetail } from 'oc-ng-common-service';

@Component({
  selector: 'oc-app-categories',
  templateUrl: './oc-app-categories.component.html',
  styleUrls: ['./oc-app-categories.component.scss']
})
export class OcAppCategoriesComponent implements OnInit {

  @Input() data: AppCategoryDetail[] = [];

  @Input() categoryHeaderTitle = '';

  @Input() noDataMsg = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
