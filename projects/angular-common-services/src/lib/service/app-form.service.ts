import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { Page } from '../model/api/page.model';
import { QueryUtil } from '../util/query.util';
import { AppFormModelResponse, CreateFormSubmissionModel, FormSubmissionModel } from '../model/api/app-form-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service for getting and modifying forms.<br>
 * Each formSubmission record is a JSON representation of form submissions made by users.
 * This can be useful for tracking contact requests and leads.
 *
 * [OpenChannel docs]{@link https://support.openchannel.io/documentation/api/user-api/forms}
 *
 * Endpoints:<br>
 *  GET  '/v2/forms'<br>
 *  GET  '/v2/forms/{formId}'<br>
 *  POST '/v2/forms/{formId}/submissions'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class AppFormService {
    /**
     * @param {HttpRequestService} httpRequest - main service for creating requests to CAP.
     * @param {OcApiPaths} apiPaths - basic API paths for endpoint groups.
     */
    constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     * Description: Returns list of forms.
     * This is private API endpoint. User/Developer must have 'FORMS.READ' permission.<br>
     *
     * return : [Observable]{@link Observable}<[Page]{@link Page}<[AppFormModelResponse]{@link AppFormModelResponse}>><br>
     *
     * @param {number} pageNumber Current page index. Starts from >= 1.
     * @param {number} pageLimit Count Forms into response. Starts from >= 1.
     * @returns {Observable<Page<AppFormModelResponse>>} Observable<Page<AppFormModelResponse>>
     */
    getForms(pageNumber: number, pageLimit: number): Observable<Page<AppFormModelResponse>> {
        const mainUrl = `${this.apiPaths.forms}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
        return this.httpRequest.get(encodeURI(mainUrl));
    }

    /**
     * Description: Returns list form by ID.
     * This is public API endpoint.
     * @param {string} formId - the id of the form.
     * @returns {Observable<AppFormModelResponse>} Observable<AppFormModelResponse>
     */
    getForm(formId: string): Observable<AppFormModelResponse> {
        const mainUrl = `${this.apiPaths.forms}/${formId}`;
        return this.httpRequest.get(mainUrl);
    }

    /**
     * Description: Creating an form submission for a particular form.
     * This can be useful for tracking leads or contact form submissions.
     * This is public API endpoint.<br>
     * [OpenChannel docs]{@link https://support.openchannel.io/documentation/api/user-api/forms/create-form-submission/}
     * @param {string} formId - unique formId identifier.
     * @param {CreateFormSubmissionModel} createFormSubmissionModel - request body.
     * @returns {Observable<FormSubmissionModel>} Observable<FormSubmissionModel>
     */
    createFormSubmission(formId: string, createFormSubmissionModel: CreateFormSubmissionModel): Observable<FormSubmissionModel> {
        const mainUrl = `${this.apiPaths.forms}/${formId}/submissions`;
        return this.httpRequest.post(encodeURI(mainUrl), createFormSubmissionModel);
    }
}
