import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { RequestModel, RequestModelResponse, RequestStatusModel } from '../model/api/request.model';
import { HttpHeaders } from '@angular/common/http';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class RequestService {

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
    }

    getAllRequest(pageNumber: number, limit: number, headers: HttpHeaders = new HttpHeaders()): Observable<Page<RequestModelResponse>> {
        const options: any = {
            params: new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        };
        options.headers = headers;
        return this.httpService.get(this.apiPaths.requests, options);
    }

    createRequest(request: RequestModel, autoSubmit = true, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.post(this.apiPaths.requests, autoSubmit ? { ...request, autoSubmit } : request, { headers });
    }

    updateRequest(requestId: string, request: RequestModel, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.patch(`${this.apiPaths.requests}/${requestId}`, request, { headers });
    }

    getRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.get(`${this.apiPaths.requests}/${requestId}`, { headers });
    }

    deleteRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<boolean> {
        return this.httpService.delete(`${this.apiPaths.requests}/${requestId}`, { headers });
    }

    updateRequestStatus(
        requestId: string,
        status: RequestStatusModel,
        headers: HttpHeaders = new HttpHeaders(),
    ): Observable<RequestModelResponse> {
        return this.httpService.post(`${this.apiPaths.requests}/${requestId}/status`, status, { headers });
    }
}
