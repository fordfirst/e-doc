import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'any'
})
export class ResetPasswordService {

    constructor(
        private httpClient: HttpClient
    ) { }

    async resetPassword(data) {
        let url = `${environment.serviceUrl}auth/resetPassword`;

        if (data) {
            if (data.token) { url += `?Authorization=${data.token}` }
        }

        return this.httpClient.post<any>(url, data).toPromise();
    }

}
