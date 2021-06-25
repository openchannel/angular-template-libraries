import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcAppCardComponent } from './oc-app-card/oc-app-card.component';
import { OcAppDescriptionComponent } from './oc-app-description/oc-app-description.component';
import { OcAppGalleryComponent } from './oc-app-gallery/oc-app-gallery.component';
import { OcAppGetStartedComponent } from './oc-app-get-started/oc-app-get-started.component';
import { OcAppListGridComponent } from './oc-app-list-grid/oc-app-list-grid.component';
import { OcAppShortInfoComponent } from './oc-app-short-info/oc-app-short-info.component';
import { OcFeaturedAppsComponent } from './oc-featured-apps/oc-featured-apps.component';
import { OcImageGalleryComponent } from './oc-image-gallery/oc-image-gallery.component';
import { OcOverallRatingComponent } from './oc-overall-rating/oc-overall-rating.component';
import { OcRatingComponent } from './oc-rating/oc-rating.component';
import { OcRecommendedAppsComponent } from './oc-recommended-apps/oc-recommended-apps.component';
import { OcReviewListComponent } from './oc-review-list/oc-review-list.component';
import { OcTextSearchComponent } from './oc-text-search/oc-text-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcReviewComponent } from './oc-review/oc-review.component';

@NgModule({
    declarations: [
        OcAppCardComponent,
        OcAppDescriptionComponent,
        OcAppGalleryComponent,
        OcAppGetStartedComponent,
        OcAppListGridComponent,
        OcAppShortInfoComponent,
        OcFeaturedAppsComponent,
        OcImageGalleryComponent,
        OcOverallRatingComponent,
        OcRatingComponent,
        OcRecommendedAppsComponent,
        OcReviewListComponent,
        OcTextSearchComponent,
        OcReviewComponent,
    ],
    imports: [CommonModule, NgbModule, OcCommonLibModule, RouterModule, FormsModule],
    exports: [
        OcAppCardComponent,
        OcAppDescriptionComponent,
        OcAppGalleryComponent,
        OcAppGetStartedComponent,
        OcAppListGridComponent,
        OcAppShortInfoComponent,
        OcFeaturedAppsComponent,
        OcImageGalleryComponent,
        OcOverallRatingComponent,
        OcRatingComponent,
        OcRecommendedAppsComponent,
        OcReviewListComponent,
        OcTextSearchComponent,
        OcReviewComponent
    ],
})
export class OcMarketComponentsModule {}
