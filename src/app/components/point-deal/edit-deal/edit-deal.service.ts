import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class EditDealService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async editVoucher(data) {
        let url = `${environment.serviceUrl}editVoucher`;

        data.quotaStart = moment(data.quotaStart,'DD/MM/YYYY').format('YYYY-MM-DD')
        data.quotaEnd = moment(data.quotaEnd,'DD/MM/YYYY').format('YYYY-MM-DD')

        return this.httpClient.put<any>(url, data).toPromise();
    }

    async getEditVoucherById(id) {
        let url = `${environment.serviceUrl}getEditVoucherById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
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

    async deleteVoucher(id) {
        let url = `${environment.serviceUrl}deleteVoucher/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
