import {Injectable} from '@angular/core';
import {Page} from '../model/api/page.model';
import {InviteDeveloperModel, InviteUserModel} from '../model/api/invite-user.model';
import {Observable} from 'rxjs';
import {HttpRequestService} from './http-request-services';
import {OcHttpParams} from '../model/api/http-params-encoder-model';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {

  readonly INVITE_URL = 'v2/invites';

  constructor(private httpService: HttpRequestService) {
  }

  getUserInvites(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<InviteUserModel>> {
    const mainUrl = `${this.INVITE_URL}/users`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('query', query);

    return this.httpService.get(mainUrl, { params });
  }

  getUserInviteInfoByToken(token: string): Observable<InviteUserModel> {
    return this.httpService.get(`${this.INVITE_URL}/users/byToken/${token}`);
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

  deleteUserInvite(inviteId: string): Observable<any> {
    return this.httpService.delete(`${this.INVITE_URL}/users/byId/${inviteId}`);
  }

  getDeveloperInvites(pageNumber: number, limit: number, sort?: string, query?: string): Observable<Page<InviteDeveloperModel>> {
    const mainUrl = `${this.INVITE_URL}/developers`;

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

  /** In order to validate the invite token and get the details for the invite */
  getDeveloperInviteInfoByToken(token: string): Observable<InviteDeveloperModel> {
    return this.httpService.get(`${this.INVITE_URL}/developers/byToken/${token}`);
  }

  /** Delete user invite */
  deleteDeveloperInvite(inviteId: string): Observable<any> {
    return this.httpService.delete(`${this.INVITE_URL}/developers/byId/${inviteId}`);
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
    return this.httpService.post(`${this.INVITE_URL}/${userType}`, body);
  }
}
