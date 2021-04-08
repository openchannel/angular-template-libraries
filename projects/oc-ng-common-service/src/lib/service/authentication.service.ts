import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable, of, throwError} from 'rxjs';
import {LoginRequest, LoginResponse, RefreshTokenRequest} from '../model/api/login.model';
import {AuthHolderService} from './auth-holder.service';
import {catchError, flatMap, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private static readonly AUTH_URL = 'auth';
    public static readonly INIT_CSRF_URL = `${AuthenticationService.AUTH_URL}/csrf`;

    constructor(private httpService: HttpRequestService,
                private authHolderService: AuthHolderService) {
    }

    initCsrf(): Observable<any> {
        return this.httpService.get( AuthenticationService.INIT_CSRF_URL);
    }

    getAuthConfig(): Observable<any> {
        return this.httpService.get(`${(AuthenticationService.AUTH_URL)}/config`);
    }

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.httpService.post(`${AuthenticationService.AUTH_URL}/external/token`, request);
    }

    refreshToken(request: RefreshTokenRequest): Observable<LoginResponse> {
        return this.httpService.post(`${AuthenticationService.AUTH_URL}/refresh`, request);
    }

    logOut(): Observable<void> {
        return this.httpService.post(`${AuthenticationService.AUTH_URL}/logout`,
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
