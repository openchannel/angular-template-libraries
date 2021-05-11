import { moduleMetadata } from '@storybook/angular';
import {
  AppCategoryDetail,
  OcAppCategoriesComponent
} from 'oc-ng-common-component/src/lib/app-categories';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CarouselModule } from 'ngx-owl-carousel-o';

const appCategory1 = new AppCategoryDetail();
appCategory1.categoryCardClass = 'category-card';
appCategory1.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png';
appCategory1.categoryName = 'All Apps';
appCategory1.categoryTitleColor = 'orange';

const appCategory2 = new AppCategoryDetail();
appCategory2.categoryCardClass = 'category-card';
appCategory2.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-2.png';
appCategory2.categoryName = 'Analytics';
appCategory2.categoryTitleColor = 'blue';

const appCategory3 = new AppCategoryDetail();
appCategory3.categoryCardClass = 'category-card';
appCategory3.categoryLogo = 'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-3.png';
appCategory3.categoryName = 'Communication';
appCategory3.categoryTitleColor = 'green';

const modules = {
  imports: [
    HttpClientTestingModule,
    RouterTestingModule.withRoutes([]),
    BrowserAnimationsModule,
    AngularSvgIconModule.forRoot(),
    CarouselModule,
  ],
};

export default {
  title: 'App Categories [BEM]',
  component: OcAppCategoriesComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const AppCategoriesComponent = (args: OcAppCategoriesComponent) => ({
  component: OcAppCategoriesComponent,
  moduleMetadata: modules,
  props: args,
});

export const Empty = AppCategoriesComponent.bind({});
Empty.args = {
  categoryHeaderTitle: 'Categories to Explore',
  data: [],
  noDataMsg: 'No Category Found',
};

export const Some = AppCategoriesComponent.bind({});
Some.args = {
  categoryHeaderTitle: 'Categories to Explore',
  categoryRouterLink: 'test/category',
  data: [appCategory1],
};

export const All = AppCategoriesComponent.bind({});
All.args = {
  categoryHeaderTitle: 'Categories to Explore',
  categoryRouterLink: 'test/category',
  data: duplicate(5, appCategory1, appCategory2, appCategory3),
};

function duplicate<T>(count: number, ...items: T[]): T[] {
  const result: T[] = [];
  while (count-- >= 0) {
    result.push(...items);
  }
  return result;
}
