import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { AuthLogicService } from "./authLogic.service";

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization-id': '',
        'Authorization-token': ''
    })
};

@Injectable({
    // we declare that this service should be created
    // by the root application injector.
    providedIn: 'any',
})
export class ConfigService {

    constructor() { }

    updateToken() {
        httpOptions.headers = httpOptions.headers.set('Authorization-id', btoa(AuthLogicService.getSession('adminId')));
        httpOptions.headers = httpOptions.headers.set('Authorization-token', AuthLogicService.getSession('adminToken'));
    }

    serviceHandleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.message}`);

            console.log(error);

            if (error.status == 401) {
                AuthLogicService.sessionDestroy();
                window.location.replace('auth/login');
            }
        }
        return throwError(error);
    }

}
