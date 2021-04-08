import {Observable} from 'rxjs';
import {Page} from '../api/page.model';
import {DeveloperAccountModel} from '../api/developer.model';
import {UserAccount} from '../api/user.model';
import {DeveloperRole, UserRole} from '../api/account-role-model';

export abstract class UpdateOrInviteUserModel {
  modalTitle: string;
  successButtonText: string;
  requestFindUserRoles: () => Observable<Page<UserRole | DeveloperRole>>;
}

export class ModalInviteUserModel extends UpdateOrInviteUserModel {
  requestSendInvite: (accountData: any) => Observable<any>;
}

export class ModalUpdateUserModel extends UpdateOrInviteUserModel {
  userData?: DeveloperAccountModel | UserAccount;
  requestUpdateAccount: (accountId: string, accountData: any) => Observable<any>;
}
