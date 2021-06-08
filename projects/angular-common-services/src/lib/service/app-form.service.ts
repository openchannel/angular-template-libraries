import { Inject, Injectable, Optional } from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {QueryUtil} from '../util/query.util';
import {
  AppFormModelResponse,
  CreateFormSubmissionModel,
  FormSubmissionModel
} from '../model/api/app-form-model';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {

  private FORM_URL;

  constructor(private httpRequest: HttpRequestService,
              private apiPaths: OcApiPaths ) {
        this.FORM_URL = apiPaths.forms;
  }

  getForms(pageNumber: number, pageLimit: number): Observable<Page<AppFormModelResponse>> {
    const mainUrl = `${this.FORM_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }

  getForm(formId: string): Observable<AppFormModelResponse> {
    const mainUrl = `${this.FORM_URL}/${formId}`;
    return this.httpRequest.get(mainUrl);
  }

  createFormSubmission(formId: string, createFormSubmissionModel: CreateFormSubmissionModel):
      Observable<FormSubmissionModel> {

    const mainUrl = `${this.FORM_URL}/${formId}/submissions`;
    return this.httpRequest.post(encodeURI(mainUrl), createFormSubmissionModel);
  }
}
