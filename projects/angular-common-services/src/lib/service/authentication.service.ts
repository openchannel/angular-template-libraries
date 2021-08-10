import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable, of, throwError} from 'rxjs';
import {LoginRequest, LoginResponse, RefreshTokenRequest} from '../model/api/login.model';
import {AuthHolderService} from './auth-holder.service';
import {catchError, flatMap, map, tap} from 'rxjs/operators';
import { OcApiPaths } from '../oc-ng-common-service.module';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {


    constructor(private httpService: HttpRequestService,
                private authHolderService: AuthHolderService,
                private apiPaths: OcApiPaths) {
    }

    initCsrf(): Observable<any> {
        return this.httpService.get(`${this.apiPaths.authorization}/csrf`);
    }

    getAuthConfig(): Observable<any> {
        return this.httpService.get(`${this.apiPaths.authorization}/config`);
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.httpService.post(`${this.apiPaths.authorization}/external/token`, request);
    }

    refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
        return this.httpService.post(`${this.apiPaths.authorization}/refresh`, request);
    }

    logOut(): Observable<void> {
        const requestBody = {
            accessToken: this.authHolderService.accessToken,
            refreshToken: this.authHolderService.refreshToken,
        };
        return this.httpService.post(`${this.apiPaths.authorization}/logout`, requestBody);
    }

    refreshTokenSilent(): Observable<any> {
        return this.refreshToken({refreshToken: this.authHolderService.refreshToken})
        .pipe(tap((response: LoginResponse) => this.authHolderService.persist(response.accessToken, response.refreshToken)),
            catchError(err => {
                this.authHolderService.clearTokensInStorage();
                return throwError(err);
            }));
    }

    tryLoginByRefreshToken(): Observable<boolean> {
        return of(this.authHolderService.isLoggedInUser())
        .pipe(flatMap((isLogged: boolean) => {
            if (isLogged) {
                return of(isLogged);
            } else if (!this.authHolderService.refreshToken) {
                return of(false);
            } else {
                return this.refreshTokenSilent()
                .pipe(map(() => this.authHolderService.isLoggedInUser()),
                    catchError(() => of(false)));
            }
        }));
    }
}
