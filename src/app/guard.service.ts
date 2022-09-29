import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./aurhService";

@Injectable({
    providedIn: 'any'
})
export class GuardService implements CanActivate {
    constructor(
        private authService: AuthService, 
        private router: Router,
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // token exist can continue
        if (this.authService.getAccessToken()) {

            if (route.data.roles && route.data.roles.indexOf(this.authService.getRole()) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/invalid-permission']);
                return false;
            }

            // check refresh token
            if (this.authService.getExpiresIn() <= (new Date().getTime() / 1000))
                this.authService.refreshToken().subscribe(data => {
                    this.authService.createSession(data)
                    return true;
                }, () => {
                    this.authService.redirection();
                })

            return true
        }

        this.authService.redirection()
        return false
    }
}
