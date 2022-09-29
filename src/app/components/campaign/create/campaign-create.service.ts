import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class CampaignCreateService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchHashtag() {
        let url = `${environment.serviceUrl}getAllSearchHashtag?pageIndex=0&limit=1000`;

        return this.httpClient.get<any>(url).toPromise();
    } 

    async createPost(data) {
        data.dateStart = data.dateStart ? moment(data.dateStart).format('YYYY-MM-DD') : null;
        data.dateEnd = data.dateEnd ? moment(data.dateEnd).format('YYYY-MM-DD') : null;
        data.campaignStartDate = data.campaignStartDate ? moment(data.campaignStartDate).format('YYYY-MM-DD') : null;
        data.campaignEndDate = data.campaignEndDate ? moment(data.campaignEndDate).format('YYYY-MM-DD') : null;

        let url = `${environment.serviceUrl}createPost`;

        return this.httpClient.post<any>(url, data).toPromise();
    }

    async getAllSearchBusinessGroup() {
        let url = `${environment.serviceUrl}getAllSearchBusinessGroup`;

        return this.httpClient.get<any>(url).toPromise();
    }

}
