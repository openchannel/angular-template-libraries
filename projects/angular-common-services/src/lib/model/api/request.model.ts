export interface RequestModel {
    name: string;
    type: string;
    appId?: string;
    userId?: string;
    userAccountId?: string;
    developerId?: string;
    developerAccountId?: string;
    customData?: any;
}

export interface RequestModelResponse extends RequestModel {
    requestId: string;
    createdDate: number;
    archived: boolean;
    archivedDate?: number;
    status: RequestStatus;
}

export type RequestStatusValue = 'draft' | 'approved' | 'rejected' | 'pending' | 'inReview';

export interface RequestStatus {
    value: RequestStatusValue;
    reason?: string;
}

export interface RequestStatusModel {
    status: RequestStatusValue;
    reason?: string;
}
