import { OcCommonLibModule, OcFormComponentsModule, OcInviteModalComponent } from '@openchannel/angular-common-components';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { NgModule } from '@angular/core';
import { ERROR_MESSAGES_STORY_PROVIDER } from './utils.model';

const modules : NgModule = {
    imports: [OcCommonLibModule, OcFormComponentsModule],
    providers: [ERROR_MESSAGES_STORY_PROVIDER],
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

