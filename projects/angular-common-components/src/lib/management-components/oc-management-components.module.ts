import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcInviteModalComponent } from './oc-invite-modal/oc-invite-modal.component';
import { OcMenuUserGridComponent } from './oc-menu-user-grid/oc-menu-user-grid.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcFormComponentsModule } from '@openchannel/angular-common-components/src/lib/form-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

@NgModule({
    declarations: [OcInviteModalComponent, OcMenuUserGridComponent],
    imports: [CommonModule, OcFormComponentsModule, OcCommonLibModule, InfiniteScrollModule, NgbModule],
    exports: [OcInviteModalComponent, OcMenuUserGridComponent],
})
export class OcManagementComponentsModule {}
