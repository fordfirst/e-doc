import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import moment from 'moment';
import { BaseService } from '@services/base.service';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '@services/config.service';

@Injectable({
    providedIn: 'any'
})
export class AnnualReportService extends BaseService {

    constructor(
        private http: HttpClient,
        private configService: ConfigService
    ) {
        super();
    }

    getAllSearchAnnualReport(search) {
        let url = `${environment.serviceUrl}getAllSearchAnnualReport`;

        // if (search) {
        //     if (search.direction) { url += `&direction=${search.direction}`; }
        // }

        return this.http.get<any>(url, this.httpOptions).pipe(catchError(this.configService.serviceHandleError)).toPromise();
    }

    createAnnualReport(data) {
        const url = `${environment.serviceUrl}createAnnualReport`;

        return this.http.post<any>(url, data, this.httpOptions).pipe(catchError(this.configService.serviceHandleError)).toPromise();
    }

    editAnnualReport(data) {
        const url = `${environment.serviceUrl}editAnnualReport`;

        return this.http.put<any>(url, data, this.httpOptions).pipe(catchError(this.configService.serviceHandleError)).toPromise();
    }

    deleteAnnualReport(annualReportId) {
        const url = `${environment.serviceUrl}deleteAnnualReport/${annualReportId}`;

        return this.http.delete<any>(url, this.httpOptions).pipe(catchError(this.configService.serviceHandleError)).toPromise();
    }

}
