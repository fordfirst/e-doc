import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class CampaignEditService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchHashtag() {
        let url = `${environment.serviceUrl}getAllSearchHashtag?pageIndex=0&limit=1000`;

        return this.httpClient.get<any>(url).toPromise();
    } 

    async getEditPostById(id) {
        let url = `${environment.serviceUrl}getEditPostById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    } 

     async getAllSearchPostQuestion(id) {
        let url = `${environment.serviceUrl}getAllSearchPostQuestion?limit=100&pageIndex=0&sort=create&direction=desc&postId=${id}`;

        return this.httpClient.get<any>(url).toPromise();
    } 

    async editPost(data) {
        data.dateStart = data.dateStart ? moment(data.dateStart,'DD/MM/YYYY').format('YYYY-MM-DD') : null;
        data.dateEnd = data.dateEnd ? moment(data.dateEnd,'DD/MM/YYYY').format('YYYY-MM-DD') : null;
        data.campaignStartDate = data.campaignStartDate ? moment(data.campaignStartDate,'DD/MM/YYYY').format('YYYY-MM-DD') : null;
        data.campaignEndDate = data.campaignEndDate ? moment(data.campaignEndDate,'DD/MM/YYYY').format('YYYY-MM-DD') : null;

        let url = `${environment.serviceUrl}editPost`;

        return this.httpClient.put<any>(url, data).toPromise();
    }

    async getAllSearchBusinessGroup() {
        let url = `${environment.serviceUrl}getAllSearchBusinessGroup`;

        return this.httpClient.get<any>(url).toPromise();
    }

}
