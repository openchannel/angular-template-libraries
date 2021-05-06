import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {QueryUtil} from '../util/query.util';
import {
  AppFormModelResponse,
  CreateFormSubmissionModel,
  FormSubmissionModel
} from '../model/api/app-form-model';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {

  private readonly FORM_URL = 'v2/forms';

  constructor(private httpRequest: HttpRequestService) {
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
