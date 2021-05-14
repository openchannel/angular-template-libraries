import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isString, merge } from 'lodash';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInviteUserModel, ModalUpdateUserModel } from '../models/oc-modal.model';

@Component({
    selector: 'oc-invite-modal',
    templateUrl: './oc-invite-modal.component.html',
    styleUrls: ['./oc-invite-modal.component.scss'],
})
export class OcInviteModalComponent implements OnInit {
    @Input() modalData: ModalInviteUserModel | ModalUpdateUserModel;

    // config for custom form generation
    formConfig: any = {};
    // custom form
    formGroup: FormGroup;
    // data from custom form
    formData: any;
    // show spinner while inviting requests
    inProcess = false;

    private listRoles: any = {};

    private modal: NgbActiveModal;

    constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }

    ngOnInit(): void {
        this.makeFormConfig();
        this.setUserRolesToForm();
    }

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

    setCreatedForm(createdForm: FormGroup): void {
        this.formGroup = createdForm;
    }

    setDataFromForm(data: any): void {
        this.formData = data;
    }

    onClickConfirmButton(): void {
        if (this.formGroup) {
            this.formGroup.markAllAsTouched();
            if (this.formGroup.valid && this.formData && !this.inProcess) {
                this.inProcess = true;

                const roles = this.toRoleId(isString(this.formData?.roles) ? [this.formData.roles] : this.formData?.roles);
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

    dismiss(): void {
        this.modal.dismiss();
    }

    private toRoleId(roles: string[]): string[] {
        const roleName = [];
        roles.forEach(r => roleName.push(this.listRoles[r]));
        return roleName;
    }

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

    private getAccountId(userData: any): string {
        if (userData?.userAccountId) {
            return userData.userAccountId;
        } else if (userData?.developerAccountId) {
            return userData.developerAccountId;
        }
        return null;
    }
}
