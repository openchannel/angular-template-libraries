import { MetaDefinition } from '@angular/platform-browser';

export interface SiteConfig {
    title: string;
    tagline?: string;
    metaTags?: MetaDefinition[];
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
    labelsY: number[];
    labelsX: string[] | number[];
    tabularLabels?: string[];
}

export interface ChartStatisticPeriodModelResponse {
    id: string;
    label: string;
    active?: boolean;
    tabularLabel?: string;
}

export interface FilterValueResponse {
    id: string;
    label: string;
    sort: string;
    query: string;
    description: string;
    checked: boolean;
}

export interface FilterResponse {
    id: string;
    name: string;
    description: string;
    values: FilterValueResponse[];
}

export interface SortValueResponse {
    id: string;
    label: string;
    sort: string;
    customData?: any;
    description: string;
    checked: boolean;
}

export interface SortResponse {
    id: string;
    name: string;
    description: string;
    values: SortValueResponse[];
}
