import { SafeResourceUrl } from '@angular/platform-browser';
import { OwnershipModelResponse } from './ownership.model';

export interface AppModelResponse {
    type: string;
    price: number;
    trial: number;
    license: string;
    modelId: string;
    currency: string;
    commission?: number;
    feePayer?: string;
    billingPeriod?: string | 'daily' | 'weekly' | 'monthly' | 'annually';
    billingPeriodUnit?: any;
}

export interface RestrictResponse {
    own: {
        country: string[];
    };
    view: {
        country: string[];
    };
}

export type AppStatusValue = 'pending' | 'inReview' | 'inDevelopment' | 'approved' | 'suspended' | 'rejected';

export interface AppStatusResponse {
    value: AppStatusValue;
    lastUpdated: number;
    modifiedBy: string;
    reason: string;
}

export interface StatElementResponse {
    '90day': number;
    '30day': number;
    total: number;
}

export interface StatisticsResponse {
    views: StatElementResponse;
    downloads: StatElementResponse;
    developerSales: StatElementResponse;
    totalSales: StatElementResponse;
    ownerships: StatElementResponse;
    reviews: StatElementResponse;
}

export interface GalleryItemResponse {
    title: string;
    description: string;
    image: string;
}

export interface UpdateAppVersionModel {
    name: string;
    safeName?: string[];
    approvalRequired?: boolean;
    customData: any;
}

export interface CreateAppModel {
    name: string;
    type: string;
    customData?: any;
    model?: AppModelResponse[];
    access?: string[];
}

export interface PublishAppVersionModel {
    /**
     * Current app version.
     */
    version: number;
    /**
     * True if this app should be approved automatically.
     */
    autoApprove?: boolean;
}

export interface ParentResponse {
    status: AppStatusResponse;
}

export interface AppResponse {
    appId: string;
    customData?: any;
    lastUpdated: Date | number;
    version: number;
    name: string;
    safeName: string[];
    developerId: string;
    model: AppModelResponse[];
    access?: string[];
    restrict?: RestrictResponse | {};
    allow?: RestrictResponse | {};
    submittedDate: Date | number;
    created: Date | number;
    attributes?: any;
    rating: number;
    reviewCount: number;
    status: AppStatusResponse;
    statistics: StatisticsResponse;
    isLive: boolean;
    type?: string;
    icon?: SafeResourceUrl | string;
}

export interface AppVersionResponse extends AppResponse {
    isLatestVersion?: boolean;
    children?: FullAppDataResponse[];
    parent?: ParentResponse;
    ownership?: OwnershipModelResponse;
}

export interface FullAppDataResponse {
    appId: string;
    customData?: any;
    lastUpdated?: number | Date;
    version?: number;
    name?: string;
    safeName?: string[];
    developerId?: string;
    model?: AppModelResponse[];
    access?: string[];
    restrict?: {} | RestrictResponse;
    allow?: {} | RestrictResponse;
    submittedDate?: number | Date;
    created?: number | Date;
    attributes?: any;
    rating?: number;
    reviewCount?: number;
    status?: AppStatusResponse;
    statistics?: StatisticsResponse;
    isLive: boolean;
    type?: string;
    isLatestVersion?: boolean;
    children?: FullAppDataResponse[];
    parent?: ParentResponse;
    ownership?: OwnershipModelResponse;
    icon?: SafeResourceUrl | string;
    logo?: SafeResourceUrl | string;
    summary?: string;
    description?: string;
    video?: SafeResourceUrl | string;
    images?: SafeResourceUrl[] | string[];
    categories?: string[];
    author?: string;
    gallery?: GalleryItemResponse[];
}
