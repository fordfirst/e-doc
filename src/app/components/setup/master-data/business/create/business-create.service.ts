import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class BusinessCreateService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async createBusinessGroup(data) {
        let url = `${environment.serviceUrl}createBusinessGroup`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

}