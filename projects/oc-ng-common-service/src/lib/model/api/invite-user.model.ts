export interface AbstractInviteModel {
    email?: string;
    expireDate?: number;
    expireSeconds?: number;
    createdDate?: number;
    subject?: string;
    body?: string;
    name?: string;
    type?: string;
    customData?: any;
    token?: string;
    lastSent?: number;
    roles?: string[];
    permissions?: string[];
}

export interface InviteUserModel extends AbstractInviteModel {
    userInviteId?: string;
    userInviteTemplateId?: string;
    userId?: string;
    userAccountId?: string;
}

export interface InviteDeveloperModel extends AbstractInviteModel {
    developerInviteId?: string;
    developerInviteTemplateId?: string;
    developerId?: string;
    developerAccountId?: string;
}

