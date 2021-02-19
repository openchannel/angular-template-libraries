import { moduleMetadata } from '@storybook/angular';
import { OcMenuUserGridComponent } from 'oc-ng-common-component';
import { UsersGridParametersModel } from 'oc-ng-common-service';
import { OcManagementComponentsModule } from 'oc-ng-common-component/src/lib/management-components';

const modules = {
  imports: [OcManagementComponentsModule]
};

export default {
  title: 'Grid User',
  component: OcMenuUserGridComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const ListGridComponent = (args: OcMenuUserGridComponent) => ({
  component: OcMenuUserGridComponent,
  moduleMetadata: modules,
  props: args
});

const propsConfig: UsersGridParametersModel = {
  layout: 'table',
  data: {
    pages: 50,
    pageNumber: 1,
    list: [
      {
        name: undefined,
        created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
        email: undefined,
        userId: 'undefined_id',
        userAccountId: 'undefined_account_id',
        type: undefined,
        inviteStatus: undefined,
        customData: {companyName: 'Company', interests: []},
      }, {
      name: 'Mark LL',
      created: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
      email: 'mark@test.com',
      userId: 'mark_id',
      userAccountId: 'mark_account_id',
      type: 'VIEWER',
      inviteStatus: 'ACTIVE',
      customData: {companyName: 'Mark Company', interests: []},
    },{
      name: 'Johnny Lewis',
      created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
      email: 'johnny@test.com',
      userId: 'johnny_id',
      userAccountId: 'johnny_account_id',
      type: 'ADMIN',
      inviteStatus: 'INVITED',
      customData: {companyName: 'Johnny Company', interests: []},
    },{
        name: undefined,
        created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
        email: undefined,
        userId: 'jon_id',
        userAccountId: 'jon_account_id',
        type: undefined,
        inviteStatus: undefined,
        customData: {companyName: 'Jon Company', interests: []},
      }],
    count: 50
  },
  options: ['EDIT', 'DELETE']
};

export const UsersGrid = ListGridComponent.bind({});

UsersGrid.args = {
  properties: propsConfig
};
