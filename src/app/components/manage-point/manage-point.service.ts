import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class ManagePointService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchTransaction(search) {
        let url = `${environment.serviceUrl}getAllSearchTransaction?pageIndex=0&limit=1000&isInterface=true`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getCurrentMonthTransactionReport() {
        let url = `${environment.serviceUrl}getCurrentMonthTransactionReport`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteTransactions(data) {
        let url = `${environment.serviceUrl}deleteTransaction`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async deleteTransaction(id) {
        let url = `${environment.serviceUrl}deleteTransaction/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

    async earnImplementTransaction(data) {
        let url = `${environment.serviceUrl}earnImplementTransaction`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

}
