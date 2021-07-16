export interface Status {
    value: string;
}

export interface ReviewResponse {
    reviewId?: string;
    rating: number;
    description: string;
    headline: string;
    appId: string;
    appName?: string;
    userId?: string;
    appVersion?: number;
    status?: Status;
    customData?: any;
    reportDate?: number | Date;
}
