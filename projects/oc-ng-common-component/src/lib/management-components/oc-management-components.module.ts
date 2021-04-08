import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcInviteModalComponent } from './oc-invite-modal/oc-invite-modal.component';
import { OcMenuUserGridComponent } from './oc-menu-user-grid/oc-menu-user-grid.component';
import { OcFormComponentsModule } from 'oc-ng-common-component/src/lib/form-components';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    OcInviteModalComponent,
    OcMenuUserGridComponent,
  ],
  imports: [
    CommonModule,
    OcFormComponentsModule,
    OcCommonLibModule,
    InfiniteScrollModule,
    NgbModule,
  ],
  exports: [
    OcInviteModalComponent,
    OcMenuUserGridComponent,
  ],
})
export class OcManagementComponentsModule {
}
