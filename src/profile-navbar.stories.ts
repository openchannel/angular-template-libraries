import {moduleMetadata} from '@storybook/angular';
import {
  OcCommonLibModule,
  OcProfileNavbarComponent,
} from 'projects/oc-ng-common-component/src/public-api';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
  imports: [OcCommonLibModule, NgbModule]
};

export default {
  title: 'Profile Navbar [BEM]',
  component: OcProfileNavbarComponent,
  decorators: [
    moduleMetadata(modules),
  ]
};

const ProfileNavbarComponent = (args: OcProfileNavbarComponent) => ({
  component: OcProfileNavbarComponent,
  moduleMetadata: modules,
  props: args
});

export const ProfileWithAllData = ProfileNavbarComponent.bind({});
ProfileWithAllData.args = {
  initials: 'TU',
  username: 'Test Username',
  role: 'admin'
};

export const ProfileWithTextOnly = ProfileNavbarComponent.bind({});
ProfileWithTextOnly.args = {
  username: 'Custom text'
};

