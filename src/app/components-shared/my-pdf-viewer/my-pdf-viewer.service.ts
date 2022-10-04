import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'any'
})

export class MyPdfViewerService {

    constructor(private httpClient: HttpClient) { }

    public openViewerToUrl(pathFileUrl: string, titleName: string = '', isDecode: boolean = false, page: number = 1, pdfQuery: string = ''): string {
        return `pdf-viewer?url=${btoa(pathFileUrl)}&titleName=${titleName}&isDecode=${isDecode}&page=${page}&pdfQuery=${pdfQuery}`;
    }

    public openViewer(pathFileUrl: string, titleName: string = '', isDecode: boolean = false, page: number = 1, pdfQuery: string = ''): void {
        console.log(pathFileUrl);
        window.open(`pdf-viewer?url=${btoa(pathFileUrl)}&titleName=${titleName}&isDecode=${isDecode}&page=${page}&pdfQuery=${pdfQuery}`)
    }

    public getDocumentEncoded(url: string): Promise<Blob> {
        console.log("getDocumentEncoded")
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization-id': btoa(localStorage.getItem("adminId")),
                'Authorization-token': localStorage.getItem("adminToken")
            }),
            responseType: "blob"
        };
        // @ts-ignore
        return this.httpClient.get(url, httpOptions).toPromise();
    }
}
