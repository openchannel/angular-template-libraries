import { Injectable } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { OnNewErrorsEvent, OnRemoveErrorEvent, ServerErrorModel } from '../model/oc-error.model';

@Injectable({
    providedIn: 'root',
})
export class OcErrorService {
    serverErrorList: ServerErrorModel[] = [];

    public readonly serverErrorEvent = new Subject<OnNewErrorsEvent | OnRemoveErrorEvent>();

    setServerErrorList(messages: any): void {
        this.serverErrorList = messages;
        this.serverErrorEvent.next({
            type: 'onNewErrors',
            value: this.serverErrorList
        });
    }

    clearError(error: any): void {
        let removedError: any = null;

        this.serverErrorList = this.serverErrorList.filter((err, index) => {
            if(error.field === err.field) {
                removedError = err;
                return false;
            } else {
                return true;
            }
        });

        if (removedError) {
            this.serverErrorEvent.next({
                type: 'onRemovedError',
                value: removedError
            });
        }
    }

    hasServerError(control: NgModel, errorCode: string): boolean {
        return control?.errors?.serverErrorValidator?.code === errorCode;
    }
}
