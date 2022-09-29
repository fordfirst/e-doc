import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class BusinessEditService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async getBusinessGroupById(id) {
        let url = `${environment.serviceUrl}getBusinessGroupById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async editBusinessGroup(data) {
        let url = `${environment.serviceUrl}editBusinessGroup`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

}
