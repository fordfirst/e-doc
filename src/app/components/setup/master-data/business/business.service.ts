import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class BusinessService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchBusinessGroup(search) {
        let url = `${environment.serviceUrl}getAllSearchBusinessGroup?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteBusinessGroups(data) {
        let url = `${environment.serviceUrl}deleteBusinessGroups`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async deleteBusinessGroup(id) {
        let url = `${environment.serviceUrl}deleteBusinessGroup/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}