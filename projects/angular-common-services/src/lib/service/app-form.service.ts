import { Injectable } from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {QueryUtil} from '../util/query.util';
import {
  AppFormModelResponse,
  CreateFormSubmissionModel,
  FormSubmissionModel
} from '../model/api/app-form-model';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {

  constructor(private httpRequest: HttpRequestService,
              private apiPaths: OcApiPaths ) {
  }

  getForms(pageNumber: number, pageLimit: number): Observable<Page<AppFormModelResponse>> {
    const mainUrl = `${this.apiPaths.forms}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
    return this.httpRequest.get(encodeURI(mainUrl));
  }

  getForm(formId: string): Observable<AppFormModelResponse> {
    const mainUrl = `${this.apiPaths.forms}/${formId}`;
    return this.httpRequest.get(mainUrl);
  }

  createFormSubmission(formId: string, createFormSubmissionModel: CreateFormSubmissionModel):
      Observable<FormSubmissionModel> {

    const mainUrl = `${this.apiPaths.forms}/${formId}/submissions`;
    return this.httpRequest.post(encodeURI(mainUrl), createFormSubmissionModel);
  }
}
