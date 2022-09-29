import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class BrandCreateService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async createBrand(data) {
        let url = `${environment.serviceUrl}createBrand`;

        return this.httpClient.post<any>(url,data).toPromise();
    }

}
