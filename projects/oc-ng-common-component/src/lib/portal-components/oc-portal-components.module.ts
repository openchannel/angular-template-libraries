import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcChartComponent } from './oc-chart/oc-chart.component';
import { OcAppTableComponent } from './oc-app-table/oc-app-table.component';
import { OcCommonLibModule } from 'oc-ng-common-component/src/lib/common-components';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    OcChartComponent,
    OcAppTableComponent,
  ],
  imports: [
    CommonModule,
    OcCommonLibModule,
    InfiniteScrollModule,
    NgbModule,
  ],
  exports: [
    OcChartComponent,
    OcAppTableComponent,
  ],
})
export class OcPortalComponentsModule {
}
