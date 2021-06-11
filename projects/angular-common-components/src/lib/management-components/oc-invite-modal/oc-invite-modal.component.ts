import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isString, merge } from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInviteUserModel, ModalUpdateUserModel } from '../models/oc-modal.model';

/**
 * Invite modal component. Represents component with configurable form for inviting user.
 *
 * @example <oc-ivite-modal [modalData]="{
 *      userData: {userAccountId:"7ahs08d79ya09s7dy"},
 *      requestUpdateAccount: (accountId: string, accountData: any) => Observable<any>
 *     }">
 */
@Component({
    selector: 'oc-invite-modal',
    templateUrl: './oc-invite-modal.component.html',
    styleUrls: ['./oc-invite-modal.component.scss'],
})
export class OcInviteModalComponent implements OnInit {
    /**
     * Data main data model for modal windows. Contain invite user or update user data model.
     */
    @Input() modalData: ModalInviteUserModel | ModalUpdateUserModel;

    /**
     * Config for custom form generation
     */
    formConfig: any = {};

    /**
     * Custom form
     */
    formGroup: FormGroup;

    /**
     * Data from custom form
     */
    formData: any;

    /**
     * Show spinner while inviting requests
     */
    inProcess = false;

    /**
     * @private List of user roles
     */
    private listRoles: any = {};

    /**
     * @private Active modal window instance
     */
    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }

    ngOnInit(): void {
        this.makeFormConfig();
        this.setUserRolesToForm();
    }

    /**
     * Initialisation of form config
     */
    makeFormConfig(): void {
        this.formConfig.fields = [
            {
                id: 'name',
                label: 'Name',
                description: '',
                placeholder: 'Enter Name',
                defaultValue: null,
                type: 'text',
                required: null,
                attributes: {
                    maxChars: null,
                    required: true,
                    minChars: null,
                },
                options: null,
            },
            {
                id: 'email',
                label: 'Email',
                description: '',
                placeholder: 'Email',
                defaultValue: null,
                type: 'emailAddress',
                required: null,
                attributes: {
                    maxChars: null,
                    required: true,
                    minChars: null,
                },
                options: null,
            },
            {
                id: 'roles',
                label: 'Select role',
                description: '',
                defaultValue: '',
                type: 'dropdownList',
                required: true,
                attributes: { required: true },
                options: [],
            },
        ];
        if (this.modalData instanceof ModalUpdateUserModel) {
            const updateUserData: ModalUpdateUserModel = this.modalData;
            this.formConfig.fields.forEach(field => {
                field.defaultValue = updateUserData.userData[field.id];
            });
        }
    }

    /**
     * Find user roles data and apply it to main form.
     */
    setUserRolesToForm(): void {
        this.modalData.requestFindUserRoles().subscribe(
            result => {
                if (result.list && result.list.length > 0) {
                    const roles: string[] = [];
                    result.list.forEach((r: { developerRoleId?: string; userRoleId?: string; name: string }) => {
                        if (r?.developerRoleId) {
                            this.listRoles[r.name] = r.developerRoleId;
                        } else if (r?.userRoleId) {
                            this.listRoles[r.name] = r.userRoleId;
                        }
                        roles.push(r.name);
                    });
                    this.formConfig.fields.find(field => field.id === 'roles').options = roles;
                    if (!(this.modalData instanceof ModalUpdateUserModel)) {
                        this.formConfig.fields.find(field => field.id === 'roles').defaultValue = roles[0];
                    }
                } else {
                    this.dismiss();
                }
            },
            () => this.dismiss(),
        );
    }

    /**
     * Set form to value
     * @param {FormGroup} createdForm
     */
    setCreatedForm(createdForm: FormGroup): void {
        this.formGroup = createdForm;
    }

    /**
     * Set data from form to value
     * @param {any} data
     */
    setDataFromForm(data: any): void {
        this.formData = data;
    }

    /**
     * Function that executes on click to confirm button. Check validity of form and calls request function.
     */
    onClickConfirmButton(): void {
        if (this.formGroup) {
            this.formGroup.markAllAsTouched();
            if (this.formGroup.valid && this.formData && !this.inProcess) {
                this.inProcess = true;

                const roles = (isString(this.formData?.roles) ? [this.formData.roles] : this.formData?.roles).map(r => this.listRoles[r]);
                this.formData = merge(this.formData, { customData: { roles } });
                this.formData.roles = roles;

                if (this.modalData instanceof ModalUpdateUserModel) {
                    this.updateUser(this.modalData);
                } else {
                    this.inviteUser(this.modalData);
                }
            }
        }
    }

    /**
     * Dismiss modal function
     */
    dismiss(): void {
        this.modal.dismiss();
    }

    /**
     * Fuction that call Update User method
     * @param {ModalUpdateUserModel} updateModalData
     */
    private updateUser(updateModalData: ModalUpdateUserModel): void {
        updateModalData
            .requestUpdateAccount(this.getAccountId(updateModalData.userData), merge(updateModalData.userData, this.formData))
            .subscribe(
                () => {
                    this.inProcess = false;
                    this.modal.close(true);
                },
                () => {
                    this.inProcess = false;
                },
            );
    }

    /**
     * Fuction that call Invite user method
     * @param {ModalInviteUserModel} inviteModalData
     */
    private inviteUser(inviteModalData: ModalInviteUserModel): void {
        inviteModalData.requestSendInvite(this.formData).subscribe(
            () => {
                this.inProcess = false;
                this.modal.close(true);
            },
            () => {
                this.inProcess = false;
            },
        );
    }

    /**
     * Get developer or user account id
     * @param {any} userData
     * @returns `string` or `null`
     */
    private getAccountId(userData: any): string {
        if (userData?.userAccountId) {
            return userData.userAccountId;
        } else if (userData?.developerAccountId) {
            return userData.developerAccountId;
        }
        return null;
    }
}
