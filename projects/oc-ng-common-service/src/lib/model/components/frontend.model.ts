import {MetaDefinition} from '@angular/platform-browser';

export interface SiteConfig {
    title: string;
    tagline?: string;
    metaTags?: MetaDefinition [];
    favicon?: {
        href: string;
        type?: string;
    };
}

export interface OCReviewDetailsResponse {
    reviewOwnerName: string;
    rating: number;
    review: string;
}

export interface ChartStatisticDataModelResponse {
    labelsY: number [];
    labelsX: string[] | number [];
}

export interface ChartStatisticParameterModelResponse {
    id: string;
    label: string;
    active?: boolean;
}
