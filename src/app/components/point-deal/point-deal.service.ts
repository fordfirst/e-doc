import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class PointDealService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchVoucher(search) {
        let url = `${environment.serviceUrl}getAllSearchVoucher?pageIndex=0&limit=1000`;
        
        if (search) {
            if (search.VoucherCatalogId) { url += `&voucherCatalogId=${search.VoucherCatalogId}`; }
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getCurrentMonthTransactionReport() {
        let url = `${environment.serviceUrl}getCurrentMonthTransactionReport`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchVoucherCatalog() {
        let url = `${environment.serviceUrl}getAllSearchVoucherCatalog`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteVoucher(id) {
        let url = `${environment.serviceUrl}deleteVoucher/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

    async deleteVouchers(data) {
        let url = `${environment.serviceUrl}deleteVoucher`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

}
