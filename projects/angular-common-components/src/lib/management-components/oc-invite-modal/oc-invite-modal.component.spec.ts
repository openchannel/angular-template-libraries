import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcInviteModalComponent } from './oc-invite-modal.component';
import { MockButtonComponent, MockFormComponent, MockSvgIconComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { Observable, of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsPage } from '@openchannel/angular-common-components/src/lib/common-components';
import { ComponentsUser, DeveloperRole } from '../models/user-data.model';
import { ModalInviteUserModel } from '../models/oc-modal.model';

describe('OcInviteModalComponent', () => {
    let component: OcInviteModalComponent;
    let fixture: ComponentFixture<OcInviteModalComponent>;

    const mockData: ComponentsPage<ComponentsUser | DeveloperRole> = {
        count: 0,
        list: [],
        pageNumber: 0,
        pages: 0,
    };

    class ModalInviteUserModelStub extends ModalInviteUserModel {
        requestFindUserRoles = (): Observable<any> => of(mockData);
        requestSendInvite = (accountData: any): Observable<any> => of({});
    }

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
        component.modalData = new ModalInviteUserModelStub();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
