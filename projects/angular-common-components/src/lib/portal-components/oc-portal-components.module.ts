import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcChartComponent } from './oc-chart/oc-chart.component';
import { OcAppTableComponent, OcAppTableCellPattern } from './oc-app-table/oc-app-table.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

@NgModule({
    declarations: [OcChartComponent, OcAppTableComponent, OcAppTableCellPattern],
    imports: [CommonModule, OcCommonLibModule, InfiniteScrollModule, NgbModule],
    exports: [OcChartComponent, OcAppTableComponent],
})
export class OcPortalComponentsModule {}
