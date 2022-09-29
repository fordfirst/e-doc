import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'any' })
export class HashtagEditService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    async getHashtagById(id) {
        let url = `${environment.serviceUrl}getHashtagById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async editHashtag(data) {
        let url = `${environment.serviceUrl}editHashtag`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

}
