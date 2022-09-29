import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class ScoreVoteService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getVoteSetting() {
        let url = `${environment.serviceUrl}getVoteSetting`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async editVoteSetting(data) {
        let url = `${environment.serviceUrl}editVoteSetting`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

    async getAllVoteTypeForSetting() {
        let url = `${environment.serviceUrl}getAllVoteTypeForSetting`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async createVoteType(data) {
        let url = `${environment.serviceUrl}createVoteType`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async editVoteType(data) {
        let url = `${environment.serviceUrl}editVoteType`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

    async deleteVoteType(id) {
        let url = `${environment.serviceUrl}deleteVoteType/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
