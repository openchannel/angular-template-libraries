import {storiesOf} from '@storybook/angular';
import {withA11y} from '@storybook/addon-a11y';
import {
  OcAppGalaryComponent,
  OcAppListGridComponent,
  OcCommonLibModule
} from 'projects/oc-ng-common-component/src/public-api';
import {BasicAppDetails} from 'oc-ng-common-service';
import {action} from '@storybook/addon-actions';

const modules = {
  imports: [OcCommonLibModule]
};

const app1 = new BasicAppDetails();
app1.appCardClass = "col-md-12";
app1.appDescription = "With this plugin you can communicate with your teammates any time";
app1.appLogoUrl = "https://drive.google.com/u/0/uc?id=19l7Znd-iPPYUhM6zaiQZ01rE2NpkDFyk&export=download";
app1.appName = "Plugin";
app1.appPrice = "Free";
app1.rating = 3.5;
app1.reviewCount = 12;

const app2 = new BasicAppDetails();
app2.appCardClass = "col-md-12";
app2.appDescription = "Integrate directly with your account and make customer updates a breeze";
app2.appLogoUrl = "https://drive.google.com/u/0/uc?id=1vDDzbS--o_UIgXFE_LmMfVmSAKuprCyb&export=download";
app2.appName = "Application";
app2.appPrice = "$11.99";
app2.rating = 0;
app2.reviewCount = 0;

const app3 = new BasicAppDetails();
app3.appCardClass = "col-md-12";
app3.appDescription = "With this plugin you can communicate with your teammates any time";
app3.appLogoUrl = "https://drive.google.com/u/0/uc?id=1fWkPPXp3tmkYRBy-GtCm_9PkP7fmConE&export=download";
app3.appName = "Plugin";
app3.appPrice = "Free";
app3.rating = 3.5;
app3.reviewCount = 12;

const app4 = new BasicAppDetails();
app4.appCardClass = "col-md-12";
app4.appDescription = "Improve and extend your experience right from your own UI";
app4.appLogoUrl = "https://drive.google.com/u/0/uc?id=1KipwDw0K8xJC_StaAhsyDTEgcAoVHqDp&export=download";
app4.appName = "Integration";
app4.appPrice = "$4.99";
app4.rating = 4.9;
app4.reviewCount = 87;


storiesOf('App List Grid', module)
  .addDecorator(withA11y)
  .addParameters({
    component: OcAppListGridComponent,
  })
  .add('Empty Grid', () => ({
    component: OcAppListGridComponent,
    moduleMetadata: modules,
    props: {
      appList: [],
      noAppMessage: "No App Found",
    }
  })).add('Grid with apps', () => ({
  component: OcAppListGridComponent,
  moduleMetadata: modules,
  props: {
    appList: [app1, app2, app3, app4],
    noAppMessage: "No App Found",
    gotoDetails: action('Go to details')
  }
}));
