import {OcCommonLibModule, OcFormComponentsModule, OcInviteModalComponent} from 'oc-ng-common-component';
import {moduleMetadata} from '@storybook/angular';
import {of} from 'rxjs';

const modules = {
    imports: [OcCommonLibModule, OcFormComponentsModule],
};

export default {
    title: 'Invite User modal [BEM]',
    component: OcInviteModalComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const InviteModal = (args: OcInviteModalComponent) => ({
    component: OcInviteModalComponent,
    moduleMetadata: modules,
    props: args
});

export const modal = InviteModal.bind({});

modal.args = {
    modalData: {
        modalTitle: 'Invite a member',
        successButtonText: 'Send invite',
        requestFindUserRoles: of({
            list: [{
                userRoleId: '2337627gdhwj'
            }]
        }),
        requestSendInvite: of()
    }
};

