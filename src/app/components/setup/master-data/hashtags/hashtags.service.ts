import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class HashtagsService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchHashtag(search) {
        let url = `${environment.serviceUrl}getAllSearchHashtag?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async deleteHashtags(data) {
        let url = `${environment.serviceUrl}deleteHashtags`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async deleteHashtag(id) {
        let url = `${environment.serviceUrl}deleteHashtag/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}