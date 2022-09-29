import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class CampaignService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getAllSearchPostByPublish(search) {
        let url = `${environment.serviceUrl}getAllSearchPostByPublish?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
            if (search.postTypeId) { url += `&postTypeId=${search.postTypeId}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchPostByDraft(search) {
        let url = `${environment.serviceUrl}getAllSearchPostByDraft?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
            if (search.postTypeId) { url += `&postTypeId=${search.postTypeId}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }
    
    async getAllSearchPostByDelete(search) {
        let url = `${environment.serviceUrl}getAllSearchPostByDelete?pageIndex=0&limit=1000`;

        if (search) {
            if (search.direction) { url += `&direction=${search.direction}`; }
            if (search.postTypeId) { url += `&postTypeId=${search.postTypeId}`; }
        }

        return this.httpClient.get<any>(url).toPromise();
    }

    async getCountPostByPublish() {
        let url = `${environment.serviceUrl}getCountPostByPublish`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getCountPostByDraft() {
        let url = `${environment.serviceUrl}getCountPostByDraft`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getCountPostByDelete() {
        let url = `${environment.serviceUrl}getCountPostByDelete`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async deletePost(id) {
        let url = `${environment.serviceUrl}deletePost/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
