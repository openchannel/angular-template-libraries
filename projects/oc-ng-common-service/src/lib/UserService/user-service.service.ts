import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { SignUp } from '../model/sign_up';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = 'api/v1/user';

  constructor(private httpRequest: HttpRequestService) { }

  signup(model: SignUp) {
    return this.httpRequest.post(this.url + '/sign-up', model);
  }

  getUsers() {
    return [
      {
        id: 1,
        title: 'Kaushal Parikh'
      },
      {
        id: 2,
        title: 'Moti Prajapati'
      },
      {
        id: 3,
        title: 'Zuber Bhatuk'
      },
      {
        id: 4,
        title: 'Hiren Neema'
      }
    ];
  }

}
