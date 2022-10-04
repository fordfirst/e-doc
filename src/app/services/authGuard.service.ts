import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthLogicService } from './authLogic.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        AuthLogicService.setSession('lastUrl', url);

        if (AuthLogicService.getSession('loggedIn')) {
            return true;
        } else {
            this.router.navigate(['auth/login']);
            return false;
        }
    }

}
