import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable, of, throwError} from 'rxjs';
import {LoginRequest, LoginResponse, RefreshTokenRequest} from '../model/api/login.model';
import {AuthHolderService} from './auth-holder.service';
import {catchError, flatMap, map, tap} from 'rxjs/operators';
import { OcApiPaths } from '../config/api-version.model';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private AUTH_URL;
    INIT_CSRF_URL;

    constructor(private httpService: HttpRequestService,
                private authHolderService: AuthHolderService,
                private apiPaths: OcApiPaths) {
        this.AUTH_URL = apiPaths.authorization;
        this.INIT_CSRF_URL = `${this.AUTH_URL}/csrf`;
    }

    initCsrf(): Observable<any> {
        return this.httpService.get( this.INIT_CSRF_URL);
    }

    getAuthConfig(): Observable<any> {
        return this.httpService.get(`${this.AUTH_URL}/config`);
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.httpService.post(`${this.AUTH_URL}/external/token`, request);
    }

    refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
        return this.httpService.post(`${this.AUTH_URL}/refresh`, request);
    }

    logOut(): Observable<void> {
        return this.httpService.post(`${this.AUTH_URL}/logout`,
            {refreshToken: this.authHolderService.refreshToken});
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
