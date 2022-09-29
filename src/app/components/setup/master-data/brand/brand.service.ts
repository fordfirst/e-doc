import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class BrandService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async getAllSearchBrand(search) {
        let url = `${environment.serviceUrl}getAllSearchBrand?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteBrands(data) {
        let url = `${environment.serviceUrl}deleteBrands`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async deleteBrand(id) {
        let url = `${environment.serviceUrl}deleteBrand/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
