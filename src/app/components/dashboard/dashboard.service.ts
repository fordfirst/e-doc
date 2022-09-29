import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class DashboardService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllPeriodExcelReportTransaction() {
        let url = `${environment.serviceUrl}report/getAllPeriodExcelReportTransaction`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getTransactionReportByYearAndMonth(search) {
        let url = `${environment.serviceUrl}getTransactionReportByYearAndMonth`;

        if (search) {
            if (search.monthYear && search.monthYear.month && search.monthYear.year) {
                url += `?month=${search.monthYear.month}&year=${search.monthYear.year}`;
            }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllVisitCountOfMonthReportByYear(search) {
        let url = `${environment.serviceUrl}getAllVisitCountOfMonthReportByYear`;

        if (search) {
            if (search.monthYear && search.monthYear.year) {
                url += `?year=${search.monthYear.year}`;
            }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getPostReportByYearAndMonth(search) {
        let url = `${environment.serviceUrl}getPostReportByYearAndMonth`;

        if (search) {
            if (search.monthYear && search.monthYear.month && search.monthYear.year) {
                url += `?month=${search.monthYear.month}&year=${search.monthYear.year}`;
            }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllTransactionVoucherRankReportByYearAndMonth(search) {
        let url = `${environment.serviceUrl}getAllTransactionVoucherRankReportByYearAndMonth`;

        if (search) {
            if (search.monthYear && search.monthYear.month && search.monthYear.year) {
                url += `?month=${search.monthYear.month}&year=${search.monthYear.year}`;
            }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllVisitCountRankReportByYearAndMonth(search) {
        let url = `${environment.serviceUrl}getAllVisitCountRankReportByYearAndMonth`;

        if (search) {
            if (search.monthYear && search.monthYear.month && search.monthYear.year) {
                url += `?month=${search.monthYear.month}&year=${search.monthYear.year}`;
            }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

}
