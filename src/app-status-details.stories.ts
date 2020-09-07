import {OcCommonLibModule} from "oc-ng-common-component";
import {AppStatusDetails} from 'oc-ng-common-service';
import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppListGridComponent,
  OcAppStatusDetailsComponent
} from 'projects/oc-ng-common-component/src/public-api';


const modules = {
  imports: [OcCommonLibModule]
}


const app = new AppStatusDetails();
app.appDescription = "Improve and extend your experience right from your own UI";
app.appLogoUrl = "https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download";
app.appName = "Integration";
app.appSavedDate = 1596811383535;
app.appStatus = "Draft";
app.appCategory = ['Communication', 'Featured', 'Essential Apps'];


storiesOf('App Status Details', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcAppStatusDetailsComponent,
  })
  .add('App Status', () => ({
    component: OcAppStatusDetailsComponent,
    moduleMetadata: modules,
    props: {
      appStatus: app,
    }
  }));
