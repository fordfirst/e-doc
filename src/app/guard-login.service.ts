import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./aurhService";

@Injectable({
    providedIn: 'any'
})
export class GuardLoginService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // token exist can continue
        if (this.authService.getAccessToken()) {

            // check refresh token
            if (this.authService.getExpiresIn() <= (new Date().getTime() / 1000))
                this.authService.refreshToken().subscribe(data => {
                    this.authService.createSession(data)
                    this.authService.redirectionHomepage()
                }, () => {
                    this.authService.redirection();
                })

            this.authService.redirectionHomepage()
        }

        return true
    }
}
