import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class EmployeeService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchCustomer(search) {
        let url = `${environment.serviceUrl}getAllSearchCustomer?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
            if (search.businessGroupId) { url += `&businessGroupId=${search.businessGroupId}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchBusinessGroup() {
        let url = `${environment.serviceUrl}getAllSearchBusinessGroup`;

        return this.httpClient.get<any>(url).toPromise();
    }

}
