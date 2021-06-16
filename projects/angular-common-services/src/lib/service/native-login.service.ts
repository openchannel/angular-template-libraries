import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { OCNativeCustomSignup, OCNativeDefaultSignup, UserLoginModel } from '../model/api/user-login-model';
import { SignUpByInviteRequest } from '../model/api/login.model';
import { UserResetPassword } from '../model/api/user-activation-model';
import { ChangePasswordRequest } from '../model/api/change-password.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class NativeLoginService {

    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    signIn(body: UserLoginModel): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/token`, body);
    }

    /**
     * This service is responsible for user signup feature.
     * @param userSignUp
     */
    signup(userSignUp: OCNativeDefaultSignup | OCNativeCustomSignup): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/register`, userSignUp);
    }

    /**
     * Sign up a user by invite.
     * @param userSignUp
     */
    signupByInvite(userSignUp: SignUpByInviteRequest): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/invite`, userSignUp);
    }

    /**
     * This method is responsible for submit user activation form.
     * @param activationModel
     */
    activate(activationModel: any): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/activate`, activationModel);
    }

    /**
     * This method is responsible for reset user password.
     * @param email
     */
    sendResetCode(email: string): Observable<any> {
        const params = new OcHttpParams().set('email', email);
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/send-reset-code`, null, { params });
    }

    /**
     * This method is responsible for reset user password.
     * @param request
     */
    resetPassword(request: UserResetPassword): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/reset-password`, request);
    }

    /**
     * This method is responsible for resend activation mail
     * @param email
     */
    sendActivationCode(email: string): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/send-activate-code`, email);
    }

    /**
     * This method is responsible for change user password.
     * @param request
     */
    changePassword(request: ChangePasswordRequest): Observable<any> {
        return this.httpRequest.post(`${this.apiPaths.authorizationNative}/change-password`, request);
    }
}
