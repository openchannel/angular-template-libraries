import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { OcInviteModalComponent } from './oc-invite-modal.component';
import { MockButtonComponent, MockFormComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { Observable, of, throwError } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsPage } from '@openchannel/angular-common-components/src/lib/common-components';
import { ComponentsUserAccount, DeveloperRole, UserRole } from '../models/user-data.model';
import { ComponentsDeveloperAccountModel, ModalInviteUserModel, ModalUpdateUserModel } from '../models/oc-modal.model';
import { By } from '@angular/platform-browser';

describe('OcInviteModalComponent', () => {
    let component: OcInviteModalComponent;
    let fixture: ComponentFixture<OcInviteModalComponent>;

    const mockRoleFields = {
        created: 0,
        lastUpdated: 0,
        systemDefined: false,
    };

    const mockResponseData: ComponentsPage<DeveloperRole | UserRole> = {
        count: 0,
        list: [
            {
                userRoleId: 'user-role-id',
                name: 'first',
                ...mockRoleFields,
            },
            {
                developerRoleId: 'dev-role-id',
                name: 'second',
                ...mockRoleFields,
            },
        ],
        pageNumber: 0,
        pages: 0,
    };

    const mockUserData: ComponentsUserAccount = {
        created: 0,
        userId: '',
        name: 'User',
        email: 'email@mail.com',
        customData: null,
        roles: [],
        permissions: null,
        userAccountId: 'user-account-id',
    };

    const mockDeveloperData: ComponentsDeveloperAccountModel = {
        email: 'dev.email@mail.com',
        name: 'Developer',
        roles: [],
        developerAccountId: 'dev-account-id',
    };

    const mockRequestFindUserRoles = (): Observable<ComponentsPage<DeveloperRole | UserRole>> => of(mockResponseData);

    class ModalInviteUserModelStub extends ModalInviteUserModel {
        requestFindUserRoles = mockRequestFindUserRoles;
        requestSendInvite = (): Observable<any> => of({});
    }

    class ModalUpdateUserModelStub extends ModalUpdateUserModel {
        requestFindUserRoles = mockRequestFindUserRoles;
        requestUpdateAccount = (): Observable<any> => of({});
    }

    const updateUserModel = new ModalUpdateUserModelStub();
    updateUserModel.userData = mockUserData;

    const updateDeveloperModel = new ModalUpdateUserModelStub();
    updateDeveloperModel.userData = mockDeveloperData;

    const inviteUserModel = new ModalInviteUserModelStub();

    const errorFunction = () => throwError('Error');
    const successFunction = of;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcInviteModalComponent, MockButtonComponent, MockSvgIconComponent, MockFormComponent],
                providers: [NgbActiveModal],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcInviteModalComponent);
        component = fixture.componentInstance;
        component.modalData = updateUserModel;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set form config fields in makeFormConfig function', () => {
        component.makeFormConfig();

        expect(component.formConfig.fields.length).not.toBe(0);
    });

    it('should set form config default values in makeFormConfig function, if modal data contains update user data model', () => {
        component.modalData = updateUserModel;
        component.makeFormConfig();

        component.formConfig.fields.forEach(field => {
            if (component.modalData instanceof ModalUpdateUserModel) {
                expect(field.defaultValue).toBe(component.modalData.userData[field.id]);
            }
        });
    });

    it('should dismiss modal, when requestFindUserRoles throws error', () => {
        jest.spyOn(component, 'dismiss');

        component.modalData.requestFindUserRoles = errorFunction;
        component.setUserRolesToForm();

        expect(component.dismiss).toHaveBeenCalled();
    });

    it('should dismiss modal, when requestFindUserRoles succeed', () => {
        jest.spyOn(component, 'dismiss');

        component.modalData.requestFindUserRoles = () => of({ ...mockResponseData, list: [] });
        component.setUserRolesToForm();

        expect(component.dismiss).toHaveBeenCalled();
    });

    it('should dismiss modal, by corresponding button click', () => {
        jest.spyOn(component, 'dismiss');

        const dismissButtonDE = fixture.debugElement.query(By.css('.invite-modal__dismiss-button'));
        dismissButtonDE.triggerEventHandler('click', {});

        expect(component.dismiss).toHaveBeenCalled();
    });

    it('should dismiss modal, by close modal button click', () => {
        jest.spyOn(component, 'dismiss');

        const closeButtonDE = fixture.debugElement.query(By.css('.invite-modal__header-close-icon'));
        closeButtonDE.triggerEventHandler('click', {});

        expect(component.dismiss).toHaveBeenCalled();
    });

    it('should set data to template from modalData', () => {
        const testTitle = 'Test title';
        const successText = 'Success text';

        component.modalData.modalTitle = testTitle;
        component.modalData.successButtonText = successText;
        fixture.detectChanges();

        const heading = fixture.debugElement.query(By.css('.invite-modal__header-heading')).nativeElement;
        expect(heading.textContent).toBe(testTitle);

        const confirmButton = fixture.debugElement.query(By.css('.invite-modal__confirm-button')).componentInstance;
        expect(confirmButton.text).toBe(successText);
    });

    it('should fill formConfig and listRoles, when requestFindUserRoles returns list of roles', () => {
        const roleNames = mockResponseData.list.map(role => role.name);

        component.modalData = inviteUserModel;
        fixture.detectChanges();
        component.setUserRolesToForm();

        const listRoles = (component as any).listRoles;
        Object.entries(listRoles).forEach(([name, id]) => {
            const roleItem = mockResponseData.list.find(role => role.name === name);
            expect(roleItem).toBeTruthy();

            const roleId = 'developerRoleId' in roleItem ? roleItem.developerRoleId : roleItem.userRoleId;
            expect(roleId).toBe(id);
        });

        const formConfigRole = component.formConfig.fields.find(field => field.id === 'roles');

        expect(formConfigRole.options).toEqual(roleNames);
        expect(formConfigRole.defaultValue).toEqual(roleNames[0]);
    });

    it('should set formGroup when oc-form emits createdForm event', () => {
        expect(component.formGroup).toBeUndefined();

        const formDE = fixture.debugElement.query(By.directive(MockFormComponent));
        formDE.triggerEventHandler('createdForm', {});

        expect(component.formGroup).toBeTruthy();
    });

    it('should set formData when oc-form emits formDataUpdated event', () => {
        expect(component.formData).toBeUndefined();

        const formDE = fixture.debugElement.query(By.directive(MockFormComponent));
        formDE.triggerEventHandler('formDataUpdated', {});

        expect(component.formData).toBeTruthy();
    });

    it('should set inProcess to true, if confirm button was clicked', () => {
        expect(component.inProcess).toBeFalsy();

        component.modalData = updateUserModel;
        (component.formGroup as any) = {
            valid: true,
            markAllAsTouched: () => {},
        };
        component.formData = {};

        const confirmButtonDE = fixture.debugElement.query(By.css('.invite-modal__confirm-button'));
        confirmButtonDE.triggerEventHandler('click', {});

        expect(component.inProcess).toBeTruthy();
    });

    it('should invoke requestUpdateAccount or requestSendInvite, when confirm method invoked', () => {
        component.modalData = updateUserModel;
        (component.formGroup as any) = {
            valid: true,
            markAllAsTouched: () => {},
        };
        component.formData = {
            roles: [],
        };

        jest.spyOn(component.modalData, 'requestUpdateAccount');
        component.onClickConfirmButton();
        expect(component.modalData.requestUpdateAccount).toHaveBeenCalled();

        component.modalData = inviteUserModel;

        jest.spyOn(component.modalData, 'requestSendInvite');
        component.onClickConfirmButton();
        expect(component.modalData.requestSendInvite).toHaveBeenCalled();
    });

    it('should not send user model, if formGroup is not valid', () => {
        component.modalData = updateUserModel;
        component.inProcess = false;
        (component.formGroup as any) = {
            valid: false,
            markAllAsTouched: () => {},
        };
        component.formData = {};

        const updateUserFunction = jest.spyOn(component as any, 'updateUser');

        component.onClickConfirmButton();

        expect(updateUserFunction).not.toHaveBeenCalled();
    });

    it('should not send user model, if formData absent', () => {
        component.modalData = updateUserModel;
        component.inProcess = false;
        (component.formGroup as any) = {
            valid: true,
            markAllAsTouched: () => {},
        };
        component.formData = null;
        const updateUserFunction = jest.spyOn(component as any, 'updateUser');

        component.onClickConfirmButton();

        expect(updateUserFunction).not.toHaveBeenCalled();
    });

    it('should not send user model, if inProcess is true', () => {
        component.modalData = updateUserModel;
        component.inProcess = true;
        (component.formGroup as any) = {
            valid: true,
            markAllAsTouched: () => {},
        };
        component.formData = {};
        const updateUserFunction = jest.spyOn(component as any, 'updateUser');

        component.onClickConfirmButton();

        expect(updateUserFunction).not.toHaveBeenCalled();
    });

    it('should close modal, when requestUpdateAccount or requestSendInvite completed successfully', fakeAsync(() => {
        const modalClose = jest.spyOn((component as any).modal, 'close');
        component.formData = {};

        (component as any).updateUser(updateUserModel);
        tick();

        expect(modalClose).toHaveBeenCalledWith(true);

        modalClose.mockClear();
        (component as any).inviteUser(inviteUserModel);
        tick();

        expect(modalClose).toHaveBeenCalledWith(true);
    }));

    it('should set inProcess to false, when requestUpdateAccount or requestSendInvite completed', fakeAsync(() => {
        component.formData = {};

        const testAsyncFunc = asyncFunction => {
            component.inProcess = true;
            asyncFunction();
            tick();
            expect(component.inProcess).toBeFalsy();
        };

        testAsyncFunc((component as any).updateUser.bind(component, { ...updateUserModel, requestUpdateAccount: successFunction }));
        testAsyncFunc((component as any).updateUser.bind(component, { ...updateUserModel, requestUpdateAccount: errorFunction }));
        testAsyncFunc((component as any).inviteUser.bind(component, { ...inviteUserModel, requestSendInvite: successFunction }));
        testAsyncFunc((component as any).inviteUser.bind(component, { ...inviteUserModel, requestSendInvite: errorFunction }));
    }));

    it('getAccountId should return correct account id or null', () => {
        const getAccountId = (component as any).getAccountId.bind(component);

        expect(getAccountId(mockUserData)).toBe(mockUserData.userAccountId);
        expect(getAccountId(mockDeveloperData)).toBe(mockDeveloperData.developerAccountId);
        expect(getAccountId({})).toBeNull();
    });
});
