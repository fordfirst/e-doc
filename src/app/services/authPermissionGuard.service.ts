import { Injectable } from '@angular/core';
import { AuthLogicService } from "./authLogic.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class AuthPermissionGuardService {

    constructor(
        private router: Router,
        private toastr: ToastrService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;
        let urlArray = url.split("/");
        url = urlArray.length > 2 ? '/' + urlArray[1] + '/' + urlArray[2] : url;

        if (urlArray[1] === 'supplier-manage' && AuthLogicService.hasPermission([AuthLogicService.PERMISSION_SUPPLIER_MANAGE, AuthLogicService.PERMISSION_SUPPLIER_VIEWER]))
            return true;
        else if (urlArray[1] === 'rate-manage' && AuthLogicService.hasPermission([AuthLogicService.PERMISSION_SUPPLIER_RATE_MANAGE, AuthLogicService.PERMISSION_SUPPLIER_RATE_VIEWER]))
            return true;
        else if (urlArray[1] === 'admin-manage' && AuthLogicService.hasPermission([AuthLogicService.PERMISSION_USER_MANAGE, AuthLogicService.PERMISSION_USER_VIEWER]))
            return true;

        this.toastr.error(`You don't have permission to access ${url} page`, 'ERROR');
        // this.router.navigate([AuthLogicService.getHomePage()]);
        return false;
    }
}
