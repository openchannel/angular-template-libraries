import { Observable } from 'rxjs';
import { ComponentsUserAccount, DeveloperRole, UserRole } from '../models/user-data.model';
import { ComponentsPage } from '@openchannel/angular-common-components/src/lib/common-components';

export abstract class UpdateOrInviteUserModel {
    modalTitle: string;
    successButtonText: string;
    requestFindUserRoles: () => Observable<ComponentsPage<DeveloperRole | UserRole>>;
}

export class ModalInviteUserModel extends UpdateOrInviteUserModel {
    requestSendInvite: (accountData: any) => Observable<any>;
}

export class ModalUpdateUserModel extends UpdateOrInviteUserModel {
    userData?: ComponentsDeveloperAccountModel | ComponentsUserAccount;
    requestUpdateAccount: (accountId: string, accountData: any) => Observable<any>;
}

export interface ComponentsDeveloperAccountModel {
    developerId?: string;
    accountCount?: number;
    appCount?: number;
    created?: number;
    email?: string;
    name?: string;
    type?: string;
    roles?: string[];
    permissions?: string[];
    customData?: any;
    developerAccountId?: string;
}
