import { moduleMetadata } from '@storybook/angular';
import {
    OcMenuUserGridComponent,
    OcManagementComponentsModule,
    ComponentsUsersGridParametersModel,
} from '@openchannel/angular-common-components/src/lib/management-components';

const modules = {
    imports: [OcManagementComponentsModule],
};

export default {
    title: 'Grid User [BEM]',
    component: OcMenuUserGridComponent,
    decorators: [moduleMetadata(modules)],
};

const ListGridComponent = (args: OcMenuUserGridComponent) => ({
    component: OcMenuUserGridComponent,
    moduleMetadata: modules,
    props: args,
});

const propsConfig: ComponentsUsersGridParametersModel = {
    layout: 'table',
    data: {
        pages: 50,
        pageNumber: 1,
        list: [
            {
                name: 'Emmy Lee',
                created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
                email: 'testmail@.mail.com',
                userId: 'undefined_id',
                userAccountId: 'undefined_account_id',
                type: 'VIEWER',
                roles: ['VIEWER'],
                inviteStatus: 'INVITED',
                customData: { companyName: 'Company', interests: [] },
            },
            {
                name: 'Mark LL',
                created: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
                email: 'mark@test.com',
                userId: 'mark_id',
                userAccountId: 'mark_account_id',
                type: 'VIEWER',
                roles: ['VIEWER'],
                inviteStatus: 'ACTIVE',
                customData: { companyName: 'Mark Company', interests: [] },
            },
            {
                name: 'Johnny Lewis',
                created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
                email: 'johnny@test.com',
                userId: 'johnny_id',
                userAccountId: 'johnny_account_id',
                type: 'ADMIN',
                roles: ['ADMIN'],
                inviteStatus: 'ACTIVE',
                customData: { companyName: 'Johnny Company', interests: [] },
            },
            {
                name: 'Test',
                created: new Date().getTime() - 10 * 24 * 60 * 60 * 1000,
                email: 'testtest@mail.com',
                userId: 'jon_id',
                userAccountId: 'jon_account_id',
                type: 'VIEWER',
                roles: ['VIEWER'],
                inviteStatus: 'INVITED',
                customData: { companyName: 'Jon Company', interests: [] },
            },
        ],
        count: 50,
    },
    options: ['EDIT', 'DELETE'],
};

export const UsersGrid = ListGridComponent.bind({});

UsersGrid.args = {
    properties: propsConfig,
};
