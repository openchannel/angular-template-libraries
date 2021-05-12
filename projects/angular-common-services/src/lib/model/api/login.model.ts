export class LoginRequest {
    idToken: string;
    accessToken: string;

    constructor(idToken: string, accessToken: string) {
        this.idToken = idToken;
        this.accessToken = accessToken;
    }
}

export interface LoginResponse {
    refreshToken: string;
    accessToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface SignUpByInviteRequest {
    inviteToken: string;
    userCustomData: any;
}
