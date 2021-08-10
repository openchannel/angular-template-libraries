import { Injectable } from '@angular/core';
import { Page } from '../model/api/page.model';
import { InviteDeveloperModel, InviteUserModel } from '../model/api/invite-user.model';
import { Observable } from 'rxjs';
import { HttpRequestService } from './http-request-services';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service to manage User Invites.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/invites/users'<br>
 *
 * GET 'v2/invites/users/byToken/{token}'<br>
 *
 * POST 'v2/invites/users/byId/{inviteId}'<br>
 *
 * DELETE 'v2/invites/users/byId/{inviteId}'<br>
 *
 * GET 'v2/invites/developers'<br>
 *
 * GET 'v2/invites/developers/byToken/{token}'<br>
 *
 * POST 'v2/invites/developers/byId/{inviteId}'<br>
 *
 * DELETE 'v2/invites/users/byId/{inviteId}'<br>
 *
 * POST 'v2/invites/{userType}'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class InviteUserService {
    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     * Description: Get list of user invites with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} limit - (optional) Count user invites into response. Starts from >= 1
     * @param {string} sort - (optional) Sort user invites by specific field
     * @param {string} query - (optional) Your specific search query
     * @returns {Observable<Page<InviteUserModel>>} `Observable<Page<InviteUserModel>>`
     *
     * ### Example
     *
     * `getUserInvites(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")`
     */
    getUserInvites(pageNumber?: number, limit?: number, sort?: string, query?: string): Observable<Page<InviteUserModel>> {
        const mainUrl = `${this.apiPaths.invites}/users`;

        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('sort', sort)
            .append('query', query);

        return this.httpService.get(mainUrl, { params });
    }

    /**
     *
     * Description: Get full invite info by token
     *
     * @param {string} token - (required)
     * @returns {Observable<InviteUserModel>} `Observable<InviteUserModel>`
     *
     * ### Example
     *
     * getUserInviteInfoByToken('0ah7sd087has8d7h')
     */
    getUserInviteInfoByToken(token: string): Observable<InviteUserModel> {
        return this.httpService.get(`${this.apiPaths.invites}/users/byToken/${token}`);
    }

    /**
     *
     * Description: Sending invite to the user
     *
     * @param {any} inviteData - (required) data from invite form
     * @param {string} userInviteTemplateId - (required) id of the email template
     * @param {string} company - (required) name of the inviter company
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `sendUserInvite('ha9s8hd9a8shd','company', {});`
     */
    sendUserInvite(userInviteTemplateId: string, company: string, inviteData: any): Observable<any> {
        return this.sendInvite('users', company, inviteData, { userInviteTemplateId });
    }

    /**
     *
     * Description: Edit developer invite
     *
     * @param {string} inviteData - (required) data from invite form
     * @param {any} inviteId - (required) id of the invite
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * editUserInvite('807has87dha8', {})
     */
    editUserInvite(inviteId: string, inviteData: any): Observable<any> {
        return this.httpService.post(`${this.apiPaths.invites}/users/byId/${inviteId}`, inviteData);
    }

    /**
     *
     * Description: Delete developer invite
     *
     * @param {string} inviteId - (required)
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * deleteUserInvite('uahs09d8a9sd8h')
     */
    deleteUserInvite(inviteId: string): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.invites}/users/byId/${inviteId}`);
    }

    /**
     *
     * Description: Get list of developer invites with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} limit - (optional) Count user invites into response. Starts from >= 1
     * @param {string} sort - (optional) Sort user invites by specific field
     * @param {string} query - (optional) Your specific search query
     * @returns {Observable<Page<InviteDeveloperModel>>} `Observable<Page<InviteDeveloperModel>>`
     *
     * ### Example
     *
     * `getDeveloperInvites(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")`
     */
    getDeveloperInvites(pageNumber?: number, limit?: number, sort?: string, query?: string): Observable<Page<InviteDeveloperModel>> {
        const mainUrl = `${this.apiPaths.invites}/developers`;

        const params = new OcHttpParams()
            .append('pageNumber', String(pageNumber))
            .append('limit', String(limit))
            .append('query', query)
            .append('sort', sort);

        return this.httpService.get(mainUrl, { params });
    }

    /**
     *
     * Description: Sending invite to the user
     *
     * @param {any} inviteData - (required) data from invite form
     * @param {string} developerInviteTemplateId - (required) id of the email template
     * @param {string} company - (required) name of the inviter company
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `sendDeveloperInvite('9ahs09d8jas9d8', 'company', {})`
     */
    sendDeveloperInvite(developerInviteTemplateId: string, company: string, inviteData: any): Observable<any> {
        return this.sendInvite('developers', company, inviteData, { developerInviteTemplateId });
    }

    /**
     *
     * Description: Edit developer invite
     *
     * @param {any} inviteData - (required) data from invite form
     * @param {string} inviteId - (required) id of the invite
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `editDeveloperInvite('9ahs09d8jas9d8', {})`
     */
    editDeveloperInvite(inviteId: string, inviteData: any): Observable<any> {
        return this.httpService.post(`${this.apiPaths.invites}/developers/byId/${inviteId}`, inviteData);
    }

    /**
     *
     * Description: In order to validate the invite token and get the details for the invite
     *
     * @param {string} token - (required)
     * @returns {Observable<InviteDeveloperModel>} `Observable<InviteDeveloperModel>`
     *
     * ### Example
     *
     * `getDeveloperInviteInfoByToken('9ahs09d8jas9d')`
     */
    getDeveloperInviteInfoByToken(token: string): Observable<InviteDeveloperModel> {
        return this.httpService.get(`${this.apiPaths.invites}/developers/byToken/${token}`);
    }

    /**
     *
     * Description: Delete user invite
     *
     * @param {string} inviteId - (required)
     * @returns {Observable<any>} `Observable<any>`
     *
     * ### Example
     *
     * `deleteDeveloperInvite('9ahs09d8jas9d')`
     */
    deleteDeveloperInvite(inviteId: string): Observable<any> {
        return this.httpService.delete(`${this.apiPaths.invites}/developers/byId/${inviteId}`);
    }

    /**
     *
     * Description: Send invite to user or developer
     *
     * @param {'developers'| 'users'} userType - (required) Chose user type
     * @param {string} company - (required) Company name
     * @param {any} userInviteData - (required) Invite data
     * @param {{developerInviteTemplateId} | {userInviteTemplateId}} inviteIDs - (required)
     * @returns {Observable<any>} `Observable<any>`
     *
     *
     * ### Example
     *
     * `sendInvite('developers', 'company', {}, 'aosudj9a8sjd98')`
     */
    private sendInvite(
        userType: 'developers' | 'users',
        company: string,
        userInviteData: any,
        inviteIDs: { developerInviteTemplateId: string } | { userInviteTemplateId: string },
    ): Observable<any> {
        const mailBody = `<a href="${window.location.origin}/invite/{token}">Accept Invitation</a>`;
        const body = {
            ...userInviteData,
            ...inviteIDs,
            body: mailBody,
            customData: { company, ...(userInviteData?.customData ? userInviteData.customData : {}) },
        };
        return this.httpService.post(`${this.apiPaths.invites}/${userType}`, body);
    }
}
