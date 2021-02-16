import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalInviteUserModel, ModalUpdateUserModel} from 'oc-ng-common-service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'oc-invite-modal',
  templateUrl: './oc-invite-modal.component.html',
  styleUrls: ['./oc-invite-modal.component.scss']
})
export class OcInviteModalComponent implements OnInit {

  @Input() ngbModalRef: NgbModalRef;

  @Input() modalData: ModalInviteUserModel | ModalUpdateUserModel;

  // config for custom form generation
  public formConfig: any = {};
  // array of developer types id
  public userTypes: string [] = [];
  // custom form
  public formGroup: FormGroup;
  // data from custom form
  public formData: any;
  // show spinner while inviting requests
  public inProcess = false;

  constructor() {
  }

  ngOnInit(): void {
    this.makeFormConfig();
    this.getUserType();
  }

  makeFormConfig() {
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
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
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
          minChars: null
        },
        options: null,
        subFieldDefinitions: null
      },
      {
        id: 'type',
        label: 'Select Role',
        description: '',
        defaultValue: '',
        type: 'dropdownList',
        required: null,
        attributes: {required: true},
        options: [],
        subFieldDefinitions: null
      }
    ];
    if (this.modalData instanceof ModalUpdateUserModel) {
      const updateUserData: ModalUpdateUserModel = this.modalData;
      this.formConfig.fields.forEach(field => {
        field.defaultValue = updateUserData.userData[field.id];
      });
    }
  }

  getUserType() {
    this.modalData.requestFindUserTypes().subscribe(result => {
      if (result.list && result.list.length > 0) {
        result.list.forEach((type: any) => {
          if (type?.developerAccountTypeId) {
            this.userTypes.push(type?.developerAccountTypeId);
          } else if (type?.userAccountTypeId) {
            this.userTypes.push(type.userAccountTypeId);
          }
        });
        this.formConfig.fields.find(field => field.id === 'type').options = [...this.userTypes];
        if (!(this.modalData instanceof ModalUpdateUserModel)) {
          this.formConfig.fields.find(field => field.id === 'type').defaultValue = this.userTypes[0];
        }
      } else {
        this.ngbModalRef.close();
      }
    }, () => {
      this.ngbModalRef.close();
    });
  }

  setCreatedForm(createdForm: FormGroup) {
    this.formGroup = createdForm;
  }

  setDataFromForm(data: any) {
    this.formData = data;
  }

  onClickConfirmButton() {
    if (this.formGroup) {
      this.formGroup.markAllAsTouched();
      if (this.formGroup.valid && this.formData && !this.inProcess) {
        this.inProcess = true;
        if (this.modalData instanceof ModalUpdateUserModel) {
          this.updateUser(this.modalData);
        } else {
          this.inviteUser(this.modalData);
        }
      }
    }
  }

  private updateUser(updateModalData: ModalUpdateUserModel): void {
    updateModalData.requestUpdateAccount(this.getAccountId(updateModalData.userData),
      {
        ...updateModalData.userData,
        ...this.formData
      }).subscribe(() => {
      this.inProcess = false;
      this.ngbModalRef.close(true);
    }, () => {
      this.inProcess = false;
    });
  }

  private inviteUser(inviteModalData: ModalInviteUserModel): void {
    inviteModalData.requestSendInvite(this.formData)
      .subscribe(() => {
        this.inProcess = false;
        this.ngbModalRef.close(true);
      }, () => {
        this.inProcess = false;
      });
  }

  private getAccountId(userData: any): string {
    if (userData?.userAccountId) {
      return userData.userAccountId;
    } else if (userData?.developerAccountId) {
      return userData.developerAccountId;
    }
    return null;
  }

  onClose() {
    this.ngbModalRef.close();
  }
}
