import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { OCNativeCustomSignup, OCNativeDefaultSignup, UserLoginModel } from '../model/api/user-login-model';
import { SignUpByInviteRequest } from '../model/api/login.model';
import { UserResetPassword } from '../model/api/user-activation-model';
import { ChangePasswordRequest } from '../model/api/change-password.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';

/**

 * Description: API service for Native authorization.<br>

 * Endpoints:<br>

 * POST 'auth/native/token'<br>

 * POST 'auth/native/register'<br>

 * POST 'auth/native/invite'<br>

 * POST 'auth/native/activate'<br>

 * POST 'auth/native/send-reset-code'<br>

 * POST 'auth/native/reset-password'<br>

 * POST 'auth/native/send-activate-code'<br>

 * POST 'auth/native/change-password'<br>

 */
@Injectable({
    providedIn: 'root',
})
export class NativeLoginService {
    private readonly NATIVE_URL = 'auth/native';

    constructor(private httpRequest: HttpRequestService) {}
    /**
     *
     * Description: Login to app
     *
     * @param {UserLoginModel} body - (required) User login data
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `signIn({
     *    email: 'admin@admin.com',
     *    password: 'Password1!',
     *    isChecked: true
     * })`
     *
     */
    signIn(body: UserLoginModel): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/token`, body);
    }

    /**
     * Description: This service is responsible for user signup feature.
     *
     * @param {OCNativeDefaultSignup | OCNativeCustomSignup} userSignUp - (required) User Sign Up data
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `signup({
     *      uname:'Name',
     *      email:'email@email.com',
     *      company:'company',
     *      password:'password'
     *  })`
     *
     * OR
     *
     * `signup({
     *  account: {
     *      name: 'Acc',
     *      username: 'Name',
     *      type: 'Type',
     *      email: 'email@email.com',
     *      customData: {},
     * },
     *  organization: {
     *      name: 'Acc',
     *      username: 'Name',
     *      type: 'Type',
     *      email: 'email@email.com',
     *      customData: {},
     * }
     * })`
     */
    signup(userSignUp: OCNativeDefaultSignup | OCNativeCustomSignup): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/register`, userSignUp);
    }

    /**
     * Description: Sign up a user by invite.
     *
     * @param {SignUpByInviteRequest} userSignUp - (required) Invited user Sign Up data and Token
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `signupByInvite({
     *      inviteToken: 'a97hsd987ahsd87ha0s7d8h0',
     *      userCustomData: {name: 'Name'}
     * })`
     */
    signupByInvite(userSignUp: SignUpByInviteRequest): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/invite`, userSignUp);
    }

    /**
     * Description: This method is responsible for submit user activation form.
     *
     * @param {any} activationModel - (required) Data from activation form
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `activate({
     *  name: 'Name'
     * })`
     */
    activate(activationModel: any): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/activate`, activationModel);
    }

    /**
     * Description: This method is responsible for reset user password.
     *
     * @param {string} email - (required) User Email to send reset Code
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `sendResetCode('email@email.com');`
     */
    sendResetCode(email: string): Observable<any> {
        const params = new OcHttpParams().set('email', email);
        return this.httpRequest.post(`${this.NATIVE_URL}/send-reset-code`, null, { params });
    }

    /**
     * Description: This method is responsible for reset user password.
     *
     * @param {UserResetPassword} request (required) Request params. New password and code.
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `resetPassword({
     *     newPassword: 'password'
     *     code: '123'
     * })`
     */
    resetPassword(request: UserResetPassword): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/reset-password`, request);
    }

    /**
     * Description: This method is responsible for resend activation mail
     *
     * @param {string} email - (required) User Email to send Activation Code
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `sendActivationCode('email@email.com');`
     */
    sendActivationCode(email: string): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/send-activate-code`, email);
    }

    /**
     * Descriptiom: This method is responsible for change user password.
     *
     * @param {ChangePasswordRequest} request (required) Model with current and new passwords
     * @returns {Observable<any>} `Observable<any>`
     *
     * * ### Example:
     *
     * `changePassword({
     *      password: 'password',
     *      newPassword: 'newPassword'
     * });`
     */
    changePassword(request: ChangePasswordRequest): Observable<any> {
        return this.httpRequest.post(`${this.NATIVE_URL}/change-password`, request);
    }
}
