import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class OcErrorService {
    serverErrorList = [];

    setServerErrorList(messages: any): void {
        this.serverErrorList = messages;
    }

    clearError(error: any): void {
        this.serverErrorList = this.serverErrorList.filter((err, index) => {
            return error.field !== err.field;
        });
    }

    hasServerError(control: NgModel, errorCode: string): boolean {
        return control?.errors?.serverErrorValidator?.code === errorCode;
    }
}
