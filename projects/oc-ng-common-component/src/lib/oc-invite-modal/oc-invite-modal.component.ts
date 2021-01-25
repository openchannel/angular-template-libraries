import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {
  ModalInviteUserModel,
  ModalUpdateUserModel
} from 'oc-ng-common-service';

@Component({
  selector: 'oc-invite-modal',
  templateUrl: './oc-invite-modal.component.html',
  styleUrls: ['./oc-invite-modal.component.scss'],
  inputs: ['ngbModalRef', 'modalTitle']
})
export class OcInviteModalComponent implements OnInit {

  ngbModalRef: NgbModalRef;
  modalData: ModalInviteUserModel | ModalUpdateUserModel;

  // config for custom form generation
  public _formConfig: any = {};
  // array of developer types id
  public _userTypes: string [] = [];
  // custom form validity
  public _formInvalid = true;
  // data from custom form
  public _formData: any;
  // show spinner while inviting requests
  public _inviteInProcess = false;

  constructor() {
  }

  ngOnInit(): void {
    this.makeFormConfig();
    this.getUserType();
  }

  makeFormConfig() {
    this._formConfig.fields = [
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
      this._formConfig.fields.forEach(field => {
        field.defaultValue = updateUserData.userData[field.id];
      });
    }
  }

  getUserType() {
    this.modalData.requestFindUserTypes().subscribe(result => {
      if (result.list && result.list.length > 0) {
        result.list.forEach((type: any) => {
          if (type?.developerAccountTypeId) {
            this._userTypes.push(type?.developerAccountTypeId);
          } else if (type?.userAccountTypeId) {
            this._userTypes.push(type.userAccountTypeId);
          }
        });
        this._formConfig.fields.find(field => field.id === 'type').options = [...this._userTypes];
        if (!(this.modalData instanceof ModalUpdateUserModel)) {
          this._formConfig.fields.find(field => field.id === 'type').defaultValue = this._userTypes[0];
        }
      } else {
        this.ngbModalRef.close();
      }
    }, () => {
      this.ngbModalRef.close();
    });
  }


  getFormStatus(status) {
    this._formInvalid = status;
  }

  getDataFromForm(data) {
    this._formData = data;
  }

  process(generatedForm: any) {
    generatedForm.customForm.markAllAsTouched();
    if (!this._formInvalid) {
      this._inviteInProcess = true;
      this._formInvalid = true;
      if (this.modalData instanceof ModalUpdateUserModel) {
        this.updateUser(this.modalData);
      } else {
        this.inviteUser(this.modalData);
      }
    }
  }

  private updateUser(updateModalData: ModalUpdateUserModel): void {
    updateModalData.requestUpdateAccount(this.getAccountId(updateModalData.userData),
      {
        ...updateModalData.userData,
        ...this._formData
      }).subscribe(response => {
      this._formInvalid = false;
      this._inviteInProcess = false;
      this.ngbModalRef.close(true);
    }, () => {
      this._formInvalid = false;
      this._inviteInProcess = false;
    });
  }

  private inviteUser(inviteModalData: ModalInviteUserModel): void {
    inviteModalData.requestSendInvite(this._formData).subscribe(response => {
      this._formInvalid = false;
      this._inviteInProcess = false;
      this.ngbModalRef.close(true);
    }, () => {
      this._formInvalid = false;
      this._inviteInProcess = false;
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

  closeModal() {
    this.ngbModalRef.close();
  }
}
