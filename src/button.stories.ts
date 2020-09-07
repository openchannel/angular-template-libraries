import {storiesOf} from '@storybook/angular';
import {OcButtonComponent} from 'projects/oc-ng-common-component/src/lib/oc-button/oc-button.component';
import {OcAppListGridComponent} from "../projects/oc-ng-common-component/src/lib/oc-app-list-grid/oc-app-list-grid.component";

storiesOf('Buttons', module)
  .addParameters({
    component: OcButtonComponent,
  })
  .add('Primary', () => ({
    component: OcButtonComponent,
    props: {
      text: 'Submit',
      type: 'primary'
    }
  })).add('Primary Disabled', () => ({
  component: OcButtonComponent,
  props: {
    text: 'Submit',
    disabled: true,
    type: 'primary'
  }
})).add('Secondary', () => ({
  component: OcButtonComponent,
  props: {
    text: 'Cancel',
    type: 'secondary'
  }
})).add('Secondary Disabled', () => ({
  component: OcButtonComponent,
  props: {
    text: 'Submit',
    disabled: true,
    type: 'secondary'
  }
})).add('Link Button', () => ({
  component: OcButtonComponent,
  props: {
    text: 'Submit',
    type: 'link'
  }
}));


