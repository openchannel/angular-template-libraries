import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcErrorService {
  serverErrorList = [];

  setServerErrorList(messages) {
    this.serverErrorList = messages;
  }

  clearError(error) {
    this.serverErrorList = this.serverErrorList.filter((err, index) => {
      return error.field !== err.field;
    });
  }

}
