import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OcErrorService {
    serverErrorList = [];
    constructor() {
    }

    setServerErrorList(messages) {
        this.serverErrorList = messages;
    }

    clearError(error){
        this.serverErrorList = this.serverErrorList.filter(function(error, index){
                return error.field != error.field
        });
    }

}