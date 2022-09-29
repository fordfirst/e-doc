import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthService } from './aurhService';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    httpOptionsMultipart = {
        headers: new HttpHeaders({
            'Authorization': this.authService.getAccessToken()
        }), reportProgress: true
    };

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public fileUpload(formData: object): Observable<HttpEvent<unknown>> {
        return this.httpClient.request(new HttpRequest('POST', `${environment.serviceUrl}uploadTempFile`, formData, this.httpOptionsMultipart));
    }

    public fileUploadPreviewEarnExcel(formData: object): Observable<HttpEvent<unknown>> {
        return this.httpClient.request(new HttpRequest('POST', `${environment.serviceUrl}previewImportEarnImplementTransaction`, formData, this.httpOptionsMultipart));
    }

}
