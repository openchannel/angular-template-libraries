import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppCategoriesComponent} from './oc-app-categories.component';
import {AppCategoryDetail} from 'oc-ng-common-service';
import {By} from '@angular/platform-browser';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appCategory1 = new AppCategoryDetail();
appCategory1.categoryCardClass = 'category-card';
appCategory1.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png';
appCategory1.categoryName = 'All Apps';
appCategory1.categoryTitleColor = 'orange';

const appCategory2 = new AppCategoryDetail();
appCategory2.categoryCardClass = 'category-card';
appCategory2.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-2.png';
appCategory2.categoryName = 'Analytics';
appCategory2.categoryTitleColor = 'blue';

const appCategory3 = new AppCategoryDetail();
appCategory3.categoryCardClass = 'category-card';
appCategory3.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-3.png';
appCategory3.categoryName = 'Communication';
appCategory3.categoryTitleColor = 'green';

describe('OcAppCategoriesComponent', () => {
  let component: OcAppCategoriesComponent;
  let fixture: ComponentFixture<OcAppCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        CarouselModule,
        BrowserAnimationsModule,

        FontAwesomeModule,

        RouterTestingModule.withRoutes([])],
      declarations: [OcAppCategoriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcAppCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('without left scroll button', () => {

    component.data = duplicate(10, appCategory1);
    fixture.detectChanges();

    const leftScrollButton: HTMLParagraphElement = fixture.debugElement.query(By.css('.carousel-nav.carousel-left')).nativeElement;
    console.log(leftScrollButton);
  });
});

function duplicate<T>(count: number, ... items: T[]): T[] {
  const result: T[] = [];
  while (count-- >= 0) {
    result.push(...items);
  }
  return result;
}




