import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'any'
})
export class ReportService {

    constructor(
        private httpClient: HttpClient
    ) { }

    async getAllPeriodExcelReportTransaction() {
        let url = `${environment.serviceUrl}report/getAllPeriodExcelReportTransaction`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async generateExcelReportTransaction(data) {
        let url = `${environment.serviceUrl}report/generateExcelReportTransaction`;

        return this.httpClient.post<any>(url, data, { observe: 'response', responseType: 'blob' as 'json' }).toPromise();
    }

    async generateExcelReportCustomer(data) {
        let url = `${environment.serviceUrl}report/generateExcelReportCustomer`;

        return this.httpClient.post<any>(url, data, { observe: 'response', responseType: 'blob' as 'json' }).toPromise();
    }

    async generateExcelReportPost(data) {
        let url = `${environment.serviceUrl}report/generateExcelReportPost`;

        return this.httpClient.post<any>(url, data, { observe: 'response', responseType: 'blob' as 'json' }).toPromise();
    }

}
