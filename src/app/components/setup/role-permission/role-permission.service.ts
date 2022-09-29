import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class RolePermissionService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllCountAdminRole() {
        let url = `${environment.serviceUrl}getAllCountAdminRole`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllAdminRole() {
        let url = `${environment.serviceUrl}getAllAdminRole`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchAdmin(search, isRegistered) {
        let url = `${environment.serviceUrl}getAllSearchAdmin?isRegistered=${isRegistered}&pageIndex=0&limit=1000`;

        if (search) {
            if (search.adminRoleId) { url += `&adminRoleId=${search.adminRoleId}`; }
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async changeRoleAdmin(data) {
        let url = `${environment.serviceUrl}changeRoleAdmin`;

        return this.httpClient.post<any>(url,data).toPromise();
    }

    async requestRegisterAdmin(data) {
        let url = `${environment.serviceUrl}auth/requestRegisterAdmin`;

        return this.httpClient.post<any>(url,data).toPromise();
    }

    async deleteAdmin(id) {
        let url = `${environment.serviceUrl}deleteAdmin/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
