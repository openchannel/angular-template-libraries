import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request-services';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private url = 'oauth/token';

  constructor(private httpRequest: HttpRequestService) { }

  signIn(body: any): Observable<any> {
    const pbody = new HttpParams()
      .set('username', btoa(body.email))
      .set('password', body.password)
      .set('grant_type', 'password');
  

    const headers = {
      Authorization: 'Basic ' + btoa(body.clientId + ':' + body.clientSecret),
      'Content-type': 'application/x-www-form-urlencoded'
    };
  
    return this.httpRequest.login(this.url, pbody, headers);
  }
}




