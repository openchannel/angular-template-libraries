import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OcAppCategoriesComponent} from './oc-app-categories.component';
import {AppCategoryDetail} from 'oc-ng-common-service';
import {By} from '@angular/platform-browser';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Component, Directive, Input, TemplateRef } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';

@Component({
  template: '',
  selector: 'fa-icon'
})
export class FaIconMockComponent {
  @Input() icon: IconProp;
}
@Component({
  template: '',
  selector: 'owl-carousel-o'
})
export class CarouselMockComponent {
  @Input() options: OwlOptions;
}
@Directive({
  selector: '[carouselSlide]'
})
export class CarouselSlideMockDirective {
  @Input() tplRef: TemplateRef<any>;
  @Input() width: number;
}

const appCategory1 = new AppCategoryDetail();
appCategory1.categoryCardClass = 'category-card';
appCategory1.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png';
appCategory1.categoryName = 'All Apps';
appCategory1.categoryTitleColor = 'orange';

describe('OcAppCategoriesComponent', () => {
  let component: OcAppCategoriesComponent;
  let fixture: ComponentFixture<OcAppCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])],
      declarations: [
        OcAppCategoriesComponent,
        FaIconMockComponent,
        CarouselMockComponent,
        CarouselSlideMockDirective
      ]
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

  it('should move slides to the next', () => {
    component.data = [...Array(10).fill(appCategory1, 0, 9)];

    spyOn(component, 'nextSlide');
    fixture.detectChanges();

    const rightScrollButton = fixture.debugElement.query(By.css('#iconRight')).nativeElement;

    rightScrollButton.click();
    expect(component.nextSlide).toHaveBeenCalled();
  });

  it('should move slides to the preview', () => {
    component.data = [...Array(10).fill(appCategory1, 0, 9)];

    spyOn(component, 'prevSlide');
    fixture.detectChanges();

    const leftScrollButton = fixture.debugElement.query(By.css('#iconLeft')).nativeElement;

    leftScrollButton.click();
    expect(component.prevSlide).toHaveBeenCalled();
  });

  it('should router redirect', () => {
    expect(component).toBeTruthy();
  });
});




