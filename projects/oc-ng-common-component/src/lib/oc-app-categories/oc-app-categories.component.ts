import {Component, Input, OnInit} from '@angular/core';
import {AppCategoryDetail} from 'oc-ng-common-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'oc-app-categories',
  templateUrl: './oc-app-categories.component.html',
  styleUrls: ['./oc-app-categories.component.scss']
})
export class OcAppCategoriesComponent implements OnInit {

  /** Data of the category that will be shown in array */
  @Input() data: AppCategoryDetail[] = [];
  /** Title of the category section */
  @Input() categoryHeaderTitle = '';
  /** The message that will be shown when no category */
  @Input() noDataMsg = '';
  /** Main router link for the category */
  @Input() categoryRouterLink: string = '';

  constructor(private sanitizer: DomSanitizer,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  safeLogo(logoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(logoUrl);
  }
  /** Navigates to the category page */
  navigateToCategory(routerQuery?: any): void {
    if (routerQuery) {
      this.router.navigate([this.categoryRouterLink], {queryParams: routerQuery}).then();
    } else {
      this.router.navigate([this.categoryRouterLink]).then();
    }
  }
}
