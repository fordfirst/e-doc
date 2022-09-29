import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class VoucherEditService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async getVoucherCatalogById(id) {
        let url = `${environment.serviceUrl}getVoucherCatalogById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async editVoucherCatalog(data) {
        let url = `${environment.serviceUrl}editVoucherCatalog`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

}
