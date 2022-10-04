import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthLogicService } from '@services/authLogic.service';
import { BaseService } from '@services/base.service'

@Injectable({
    providedIn: 'any'
})
export class LoginService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    authorization(data) {
        const url = `${environment.serviceUrl}admin/authorization`;

        return this.http.post<any>(url, data, this.httpOptionsNotValue).toPromise();
    }

    forceChangePassword(data) {
        const url = `${environment.serviceUrl}admin/forceChangePassword`;

        return this.http.post<any>(url, data, this.httpOptions).toPromise();
    }

    logout() {
        const url = `${environment.serviceUrl}admin/logout`;

        return this.http.get<any>(url, this.httpOptions).toPromise();
    }

    changePassword(data) {
        const url = `${environment.serviceUrl}admin/changePassword`;

        return this.http.post<any>(url, data, this.httpOptions).toPromise();
    }

    getCompanyById() {
        const url = `${environment.serviceUrl}getCompanyById/1`;

        return this.http.get<any>(url, this.httpOptionsNotValue).toPromise();
    }

}
