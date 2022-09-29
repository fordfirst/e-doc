import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { retry, catchError, switchMap, take, filter } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Authorization, AuthService } from './aurhService';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private injector: Injector,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // request refresh token
        const refreshToken = this.authService.getRefreshToken()
        if (request.url == this.authService.refreshTokenUrl && refreshToken) {
            return next.handle(this.addTokenHeader(request, refreshToken)).pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log("refresh token is invalid")
                    return throwError(this.handleErrorMessage(error));
                })
            )
        }

        // common request will attach header token
        const accessToken = this.authService.getAccessToken()
        if (accessToken) {

            console.log(request.url);
            // @ts-ignore
            return next.handle(this.addTokenHeader(request, accessToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(request, next);
                }
                return throwError(this.handleErrorMessage(error));
            }));

        }

        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error)
                    return throwError(this.handleErrorMessage(error));
                })
            )
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        this.refreshTokenSubject.next(null);
        const token = this.authService.getRefreshToken();
        if (token)
            return this.authService.refreshToken().pipe(
                switchMap((data: Authorization) => {

                    console.log("response token refreshed")
                    this.authService.createSession(data)

                    this.refreshTokenSubject.next(data.access_token);

                    return next.handle(this.addTokenHeader(request, data.access_token));
                }),
                catchError((err) => {
                    this.authService.redirection();
                    return throwError(this.handleErrorMessage(err));
                })
            );

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        /* for Spring Boot back-end */
        // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        /* for Node.js Express back-end */
        return request.clone({ headers: request.headers.set("Authorization", `${this.authService.getTokenType()} ${token}`) });
    }

    handleErrorMessage(error: HttpErrorResponse): string {
        if (error.status == 422)
            return JSON.stringify(error.error.detail ? error.error.detail : error.message)
        else
            return error.error.message ? error.error.message : error.message
    }
}
