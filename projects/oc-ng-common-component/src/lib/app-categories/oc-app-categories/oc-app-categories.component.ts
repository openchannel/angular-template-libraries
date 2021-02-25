import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppCategoryDetail} from 'oc-ng-common-service';
import {DomSanitizer, SafeResourceUrl, SafeStyle} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {CarouselComponent, OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'oc-app-categories',
  templateUrl: './oc-app-categories.component.html',
  styleUrls: ['./oc-app-categories.component.scss']
})
export class OcAppCategoriesComponent implements OnInit {

  @ViewChild('carousel', {static: false}) carouselRef: CarouselComponent;

  /** Data of the category that will be shown in array */
  @Input() data: AppCategoryDetail[] = [];
  /** Title of the category section */
  @Input() categoryHeaderTitle = '';
  /** Main router link for the category */
  @Input() categoryRouterLink: string = '';
  /** Owl Carousel options */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    autoWidth: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: this.data.length > 5 ? 5 : this.data.length
      }
    },
    nav: false
  };
  constructor(private sanitizer: DomSanitizer,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  safeImage(logoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(logoUrl);
  }

  safeStyle(imageLink: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle( `url(${imageLink})`);
  }
  /** Navigates to the category page */
  navigateToCategory(routerQuery?: any): void {
    if (routerQuery) {
      this.router.navigate([this.categoryRouterLink], {queryParams: routerQuery}).then();
    } else {
      this.router.navigate([this.categoryRouterLink]).then();
    }
  }
  /** Move carousel to next slide */
  nextSlide() {
    this.carouselRef.next();
  }
  /** Move carousel to previous slide */
  prevSlide() {
    this.carouselRef.prev();
  }

}
