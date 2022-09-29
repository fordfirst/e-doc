import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class CreateDealService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async createVoucher(data) {
        let url = `${environment.serviceUrl}createVoucher`;

        data.quotaStart = moment(data.quotaStart).format('YYYY-MM-DD');
        data.quotaEnd = moment(data.quotaEnd).format('YYYY-MM-DD');

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async getAllSearchVoucherCatalog() {
        let url = `${environment.serviceUrl}getAllSearchVoucherCatalog`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchBrand() {
        let url = `${environment.serviceUrl}getAllSearchBrand`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchBusinessGroup() {
        let url = `${environment.serviceUrl}getAllSearchBusinessGroup`;

        return this.httpClient.get<any>(url).toPromise();
    }



}
