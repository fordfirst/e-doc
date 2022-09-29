import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';
import moment from 'moment';

@Injectable({
    providedIn: 'any'
})
export class CampaignDetailService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    async getPostById(id) {
        let url = `${environment.serviceUrl}getPostById/${id}`;

        return this.httpClient.get<any>(url).toPromise();
    }

    async getAllSearchPostCommentByAdmin(search) {
        let url = `${environment.serviceUrl}getAllSearchPostCommentByAdmin?limit=1000&pageIndex=0&sort=create&postId=${search.id}`;

        if (search.direction) { url += `&direction=${search.direction}`; }

        return this.httpClient.get<any>(url).toPromise();
    }

    async hidePostComment(id) {
        let url = `${environment.serviceUrl}hidePostComment/${id}`;

        return this.httpClient.post<any>(url, {}).toPromise();
    }

    async showPostComment(id) {
        let url = `${environment.serviceUrl}showPostComment/${id}`;

        return this.httpClient.post<any>(url, {}).toPromise();
    }

    async deletePost(id) {
        let url = `${environment.serviceUrl}deletePost/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

    async deletePostComment(id) {
        let url = `${environment.serviceUrl}deletePostComment/${id}`;

        return this.httpClient.delete<any>(url).toPromise();
    }

}
