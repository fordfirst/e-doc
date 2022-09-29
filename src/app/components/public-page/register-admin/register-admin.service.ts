import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'any'
})
export class RegisterAdminService {

    constructor(
        private httpClient: HttpClient
    ) { }

    async registerAdmin(data) {
        let url = `${environment.serviceUrl}auth/registerAdmin`;

        if (data) {
            if (data.token) { url += `?Authorization=${data.token}` }
        }

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async getAllSearchBusinessGroup() {
        let url = `${environment.serviceUrl}common/getAllSearchBusinessGroup`;

        return this.httpClient.get<any>(url).toPromise();
    }

}
