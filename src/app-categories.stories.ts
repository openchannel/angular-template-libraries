import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcCommonLibModule, OcAppCategoriesComponent } from 'projects/oc-ng-common-component/src/public-api';
import { AppCategoryDetail } from 'oc-ng-common-service';

const modules = {
    imports: [OcCommonLibModule]
};
const appCategory1  = new AppCategoryDetail(); 
appCategory1.categoryCardClass='category-card';
appCategory1.categoryLogo='https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png';
appCategory1.categoryName='All Apps';

const appCategory2  = new AppCategoryDetail(); 
appCategory2.categoryCardClass='category-card';
appCategory2.categoryLogo='https://stage1-philips-market-test.openchannel.io/assets/img/item-2.png';
appCategory2.categoryName='Analytics';

const appCategory3  = new AppCategoryDetail(); 
appCategory3.categoryCardClass='category-card';
appCategory3.categoryLogo='https://stage1-philips-market-test.openchannel.io/assets/img/item-3.png';
appCategory3.categoryName='Communication';

storiesOf('App Categories', module)
    .addDecorator(withA11y)
    .add('Empty', () => ({
        component: OcAppCategoriesComponent,
        moduleMetadata: modules,
        props:{
            categoryHeaderTitle: 'Categories to Explore',
            data: [],
            noDataMsg:'No Category Found'
        }
    })).add('Some', () => ({
        component: OcAppCategoriesComponent,
        moduleMetadata: modules,
        props:{
            categoryHeaderTitle: 'Categories to Explore',
            data: [appCategory1]
        }
    })).add('All', () => ({
        component: OcAppCategoriesComponent,
        moduleMetadata: modules,
        props:{
            categoryHeaderTitle: 'Categories to Explore',
            data: [appCategory1,appCategory2,appCategory3]
        }
    }));