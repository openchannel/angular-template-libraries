import {Observable} from 'rxjs';
import {ComponentsPage} from 'oc-ng-common-component/src/lib/common-components/interfaces/components-basic.model';

export abstract class UpdateOrInviteUserModel {
  modalTitle: string;
  successButtonText: string;
  requestFindUserRoles: () => Observable<ComponentsPage<ComponentsRole>>;
}

export class ModalInviteUserModel extends UpdateOrInviteUserModel {
  requestSendInvite: (accountData: any) => Observable<any>;
}

export class ModalUpdateUserModel extends UpdateOrInviteUserModel {
  userData?: ComponentsDeveloperAccountModel | ComponentsUserAccount;
  requestUpdateAccount: (accountId: string, accountData: any) => Observable<any>;
}

export interface ComponentsRole {
  created: number;
  lastUpdated: number;
  name: string;
  permissions?: string[];
  systemDefined: boolean;
  developerRoleId?: string;
  userRoleId?: string;
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

export interface ComponentsUserAccount {
  userId?: string;
  name?: string;
  email?: string;
  customData?: any;
  created: number;
  type?: string;
  roles?: string[];
  permissions?: string[];
  userAccountId?: string;
}
