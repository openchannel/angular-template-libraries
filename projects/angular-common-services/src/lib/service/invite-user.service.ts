import {Injectable} from '@angular/core';
import {Page} from '../model/api/page.model';
import {InviteDeveloperModel, InviteUserModel} from '../model/api/invite-user.model';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {

  constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
  }

  getUserInvites(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<InviteUserModel>> {
    const mainUrl = `${this.apiPaths.invites}/users`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query);

    return this.httpService.get(mainUrl, { params });
  }

  getUserInviteInfoByToken(token: string): Observable<InviteUserModel> {
    return this.httpService.get(`${this.apiPaths.invites}/users/byToken/${token}`);
  }

  /**
   * Sending invite to the user
   * @param inviteData data from invite form
   * @param userInviteTemplateId id of the email template
   * @param company name of the inviter company
   */
  sendUserInvite(userInviteTemplateId: string, company: string, inviteData: any): Observable<any> {
    return this.sendInvite('users', company, inviteData, {userInviteTemplateId});
  }

  /**
   * Edit developer invite
   * @param inviteData data from invite form
   * @param inviteId id of the invite
   */
  editUserInvite(inviteId: string, inviteData: any): Observable<any> {
    return this.httpService.post(`${this.apiPaths.invites}/users/byId/${inviteId}`, inviteData);
  }

  deleteUserInvite(inviteId: string): Observable<any> {
    return this.httpService.delete(`${this.apiPaths.invites}/users/byId/${inviteId}`);
  }

  getDeveloperInvites(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<InviteDeveloperModel>> {
    const mainUrl = `${this.apiPaths.invites}/developers`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query)
      .append('sort', sort);

    return this.httpService.get(mainUrl, { params });
  }

  /**
   * Sending invite to the user
   * @param inviteData data from invite form
   * @param developerInviteTemplateId id of the email template
   * @param company name of the inviter company
   */
  sendDeveloperInvite(developerInviteTemplateId: string, company: string, inviteData: any): Observable<any> {
    return this.sendInvite('developers', company, inviteData, {developerInviteTemplateId});
  }

  /**
   * Edit developer invite
   * @param inviteData data from invite form
   * @param inviteId id of the invite
   */
  editDeveloperInvite(inviteId: string, inviteData: any): Observable<any> {
    return this.httpService.post(`${this.apiPaths.invites}/developers/byId/${inviteId}`, inviteData);
  }

  /** In order to validate the invite token and get the details for the invite */
  getDeveloperInviteInfoByToken(token: string): Observable<InviteDeveloperModel> {
    return this.httpService.get(`${this.apiPaths.invites}/developers/byToken/${token}`);
  }

  /** Delete user invite */
  deleteDeveloperInvite(inviteId: string): Observable<any> {
    return this.httpService.delete(`${this.apiPaths.invites}/developers/byId/${inviteId}`);
  }

  private sendInvite(userType: 'developers'| 'users', company: string, userInviteData: any,
                     inviteIDs: {developerInviteTemplateId} | {userInviteTemplateId}) {
    const mailBody = `<a href="${window.location.origin}/invite/{token}">Accept Invitation</a>`;
    const body = {
      ...userInviteData,
      ...inviteIDs,
      body: mailBody,
      customData: {company, ...(userInviteData?.customData ? userInviteData.customData : {})}
    };
    return this.httpService.post(`${this.apiPaths.invites}/${userType}`, body);
  }
}
