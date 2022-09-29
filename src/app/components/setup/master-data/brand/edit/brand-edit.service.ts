import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class BrandEditService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async getBrandById(id) {
        let url = `${environment.serviceUrl}getBrandById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async editBrand(data) {
        let url = `${environment.serviceUrl}editBrand`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

}
