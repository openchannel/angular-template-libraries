import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { RequestModel, RequestModelResponse, RequestStatusModel } from '../model/api/request.model';
import { HttpHeaders } from '@angular/common/http';

/**

 * Description: API service for getting and modifying Request model.<br>

 * Endpoints:<br>

 * GET 'v2/requests'<br>

 * POST 'v2/requests'<br>

 * GET 'v2/requests/{requestId}'<br>

 * PATCH 'v2/requests/{requestId}'<br>

 * DELETE 'v2/requests/{requestId}'<br>

 * POST 'v2/requests/{requestId}/status'<br>

 */
@Injectable({
    providedIn: 'root',
})
export class RequestService {
    private readonly REQUEST_URL = 'v2/requests';

    constructor(private httpService: HttpRequestService) {}

    /**
     *
     * Description: Get requests list with pagination
     *
     * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
     * @param {number} limit - (optional) Count users into response. Starts from >= 1.
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<Page<RequestModelResponse>>} `Observable<Page<RequestModelResponse>>`
     *
     * * ### Example:
     *
     * `getAllRequest(1,10,{"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"})`
     */
    getAllRequest(pageNumber: number, limit: number, headers: HttpHeaders = new HttpHeaders()): Observable<Page<RequestModelResponse>> {
        const options: any = {
            params: new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        };
        options.headers = headers;
        return this.httpService.get(this.REQUEST_URL, options);
    }

    /**
     *
     * Description: Create new request
     *
     * @param {RequestModel} request - (required) Request model for creation
     * @param {boolean} autoSubmit - (optional) (default: true)
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<RequestModelResponse>} `Observable<RequestModelResponse>`
     *
     * * ### Example:
     *
     * `createRequest({
     *     name:'name',
     *     type:'type',
     *     appId:'iu2h34iuh23i4',
     *     userId:'as8ujf098ausjd',
     *     userAccountId:'9uanwej',
     *     developerId:'ja9s8dj9a8sjd',
     *     developerAccountId:'8a7shd08a7hs',
     *     customData:{}
     * },
     * false,
     * {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"}
     * )`
     */
    createRequest(request: RequestModel, autoSubmit = true, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.post(this.REQUEST_URL, autoSubmit ? { ...request, autoSubmit } : request, { headers });
    }

    /**
     *
     * Description: Find some request model with id and update
     *
     * @param {string} requestId - (required) Request Id to search
     * @param {RequestModel} request - (required) Request model to update
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<RequestModelResponse>} `Observable<RequestModelResponse>`
     *
     * * ### Example:
     *
     * `updateRequest(
     * 'h0a978shd90ahs',
     * {
     *     name:'name',
     *     type:'type',
     *     appId:'iu2h34iuh23i4',
     *     userId:'as8ujf098ausjd',
     *     userAccountId:'9uanwej',
     *     developerId:'ja9s8dj9a8sjd',
     *     developerAccountId:'8a7shd08a7hs',
     *     customData:{}
     * },
     * {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"}
     * )`
     */
    updateRequest(requestId: string, request: RequestModel, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.patch(`${this.REQUEST_URL}/${requestId}`, request, { headers });
    }

    /**
     *
     * Description: Find some request model with id
     *
     * @param {string} requestId - (required) Request Id to search
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<RequestModelResponse>} `Observable<RequestModelResponse>`
     *
     * * ### Example:
     *
     * `getRequest('8a7hs8d7has8d7', {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"})`
     */
    getRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.get(`${this.REQUEST_URL}/${requestId}`, { headers });
    }

    /**
     *
     * Description: Find some request model with id and delete
     *
     * @param {string} requestId - (required) Request Id to search
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<boolean>} `Observable<boolean>`
     *
     * * ### Example:
     *
     * `deleteRequest('8a7hs8d7has8d7', {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"});`
     */
    deleteRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<boolean> {
        return this.httpService.delete(`${this.REQUEST_URL}/${requestId}`, { headers });
    }

    /**
     *
     * Description: Find Request by id and update its status
     *
     * @param {string} requestId - (required) Request Id to search
     * @param {RequestStatusModel} status - (required) Status and reason(opt) to update
     * @param {HttpHeaders} headers - (optional) (default: empty HttpHeaders object)
     * @returns {Observable<RequestModelResponse>} `Observable<RequestModelResponse>`
     *
     * * ### Example:
     *
     * `updateRequestStatus(
     * 'ajs09d8ja9s8d',
     * {
     *     status: 'draft' | 'approved' | 'rejected' | 'pending' | 'inReview',
     *     reason: 'change pls'
     * },
     * {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"}
     * );`
     */
    updateRequestStatus(
        requestId: string,
        status: RequestStatusModel,
        headers: HttpHeaders = new HttpHeaders(),
    ): Observable<RequestModelResponse> {
        return this.httpService.post(`${this.REQUEST_URL}/${requestId}/status`, status, { headers });
    }
}
