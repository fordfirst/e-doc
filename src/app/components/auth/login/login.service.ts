import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'any'
})
export class LoginService {

    constructor(
        private httpClient: HttpClient
        ) { }

    async requestResetPassword(data) {
        let url = `${environment.serviceUrl}auth/requestResetPassword`;

        return this.httpClient.post<any>(url, data).toPromise();
    }
  
}
