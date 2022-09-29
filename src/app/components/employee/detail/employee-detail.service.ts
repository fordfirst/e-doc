import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class EmployeeDetailService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getCustomerById(id) {
        let url = `${environment.serviceUrl}getCustomerById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getSumPointCurrentYearTransactionByCustomerId(id) {
        let url = `${environment.serviceUrl}getSumPointCurrentYearTransactionByCustomerId/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchTransaction(search) {
        let url = `${environment.serviceUrl}getAllSearchTransaction?pageIndex=0&limit=1000&customerId=${search.id}`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
            if (search.transactionTypeId) { url += `&transactionTypeId=${search.transactionTypeId}`; }
            if (search.startCreateDate && search.endCreateDate) { url += `&startCreateDate=${search.startCreateDate}&endCreateDate=${search.endCreateDate}` }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllVoteTypeWithReportWithHiddenLoveByCustomerId(customerId) {
        let url = `${environment.serviceUrl}getAllVoteTypeWithReportWithHiddenLoveByCustomerId/${customerId}`;

        return this.httpClient.get<any>(url).toPromise();
    }

}
