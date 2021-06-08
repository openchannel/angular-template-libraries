import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { OcHttpParams } from '../model/api/http-params-encoder-model';
import { RequestModel, RequestModelResponse, RequestStatusModel } from '../model/api/request.model';
import { HttpHeaders } from '@angular/common/http';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    private REQUEST_URL;

    constructor(private httpService: HttpRequestService, private apiPaths: OcApiPaths) {
        this.REQUEST_URL = apiPaths.requests;
    }

    getAllRequest(pageNumber: number, limit: number, headers: HttpHeaders = new HttpHeaders()): Observable<Page<RequestModelResponse>> {
        const options: any = {
            params: new OcHttpParams().append('pageNumber', String(pageNumber)).append('limit', String(limit)),
        };
        options.headers = headers;
        return this.httpService.get(this.REQUEST_URL, options);
    }

    createRequest(request: RequestModel, autoSubmit = true, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.post(this.REQUEST_URL, autoSubmit ? { ...request, autoSubmit } : request, { headers });
    }

    updateRequest(requestId: string, request: RequestModel, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.patch(`${this.REQUEST_URL}/${requestId}`, request, { headers });
    }

    getRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<RequestModelResponse> {
        return this.httpService.get(`${this.REQUEST_URL}/${requestId}`, { headers });
    }

    deleteRequest(requestId: string, headers: HttpHeaders = new HttpHeaders()): Observable<boolean> {
        return this.httpService.delete(`${this.REQUEST_URL}/${requestId}`, { headers });
    }

    updateRequestStatus(
        requestId: string,
        status: RequestStatusModel,
        headers: HttpHeaders = new HttpHeaders(),
    ): Observable<RequestModelResponse> {
        return this.httpService.post(`${this.REQUEST_URL}/${requestId}/status`, status, { headers });
    }
}
