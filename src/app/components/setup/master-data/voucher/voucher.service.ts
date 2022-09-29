import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class VoucherService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchVoucherCatalog(search) {
        let url = `${environment.serviceUrl}getAllSearchVoucherCatalog?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteVoucherCatalogs(data) {
        let url = `${environment.serviceUrl}deleteVoucherCatalogs`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async deleteVoucherCatalog(id) {
        let url = `${environment.serviceUrl}deleteVoucherCatalog/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}