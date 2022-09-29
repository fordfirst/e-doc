import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from 'environments/environment';

export interface Authorization {
    expires_in: number,
    id: number,
    name: string,
    access_token: string,
    refresh_token: string,
    token_type: string,
    role: string,
    username: string,
    code: string
}

export class Role {
    static SUPER_ADMIN: number = 1;
    static ADMIN: number = 2;
    static CONTENT_ADMIN: number = 3;
    static VIEWER: number = 4;
}

@Injectable({
    providedIn: 'any'
})
export class AuthService {

    public refreshTokenUrl: string = `${environment.serviceUrl}auth/refreshToken`;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async authorization(data: { username: string, password: string }): Promise<Authorization> {
        return this.httpClient.post<Authorization>(`${environment.serviceUrl}auth/authorization`, data).toPromise();
    }

    async logout() {
        return this.httpClient.get<any>(`${environment.serviceUrl}auth/logout`).toPromise();
    }

    public getUrlRefreshToken(): String {
        return `${this.refreshTokenUrl}`;
    }

    public refreshToken(): Observable<Authorization> {
        return this.httpClient.post<Authorization>(`${this.getUrlRefreshToken()}`, {});
    }

    public createSession(data: Authorization) {
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("refresh_token", data.refresh_token)
        localStorage.setItem("token_type", data.token_type)
        localStorage.setItem("expires_in", ((new Date().getTime() / 1000) + data.expires_in).toString())
        localStorage.setItem("navbar", JSON.stringify([]));
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);
        localStorage.setItem("code", data.code);
    }

    public clearSession() {
        localStorage.clear();
    }

    public getTokenType(): string {
        return localStorage.getItem("token_type");
    }

    public getAccessToken(): string {
        return localStorage.getItem("access_token");
    }

    public getRefreshToken(): string {
        return localStorage.getItem("refresh_token");
    }

    public getExpiresIn(): number {
        return parseFloat(localStorage.getItem("expires_in"));
    }

    public getRole(): number {
        /* 1 = super admin, 2 = admin, 3 = content admin, 4 = analyst (viewer) */

        return parseInt(localStorage.getItem("role"));
    }

    public getFrontendUrl(term: string = "") {
        return environment.frontendUrl + term;
    }

    public getUsername(): string {
        return localStorage.getItem("username");
    }

    public getCode(): string {
        return localStorage.getItem("code");
    }

    redirection() {
        /* clear session */
        /* redirection login */
        this.clearSession();
        this.router.navigate(["auth/login"]);
    }

    redirectionHomepage() {
        /* redirection homepage */
        this.router.navigate([environment.homepageUrl]);
    }
}
