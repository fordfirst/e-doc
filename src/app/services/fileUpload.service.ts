import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { ConfigService } from './config.service';
import { catchError } from 'rxjs/operators';
import { AuthLogicService } from './authLogic.service';

@Injectable({ providedIn: 'root' })
export class FileUploadService {

    private static http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    private static URLHost: any = 'https://www.ddimeeting.com:8443/emeetingClient/';

    constructor(private http: HttpClient,
        private configService: ConfigService
    ) { }

    public static fileUpload(file, encode: boolean = true) {
        let headers: any = {
            headers: new HttpHeaders({
                'authorization-id': btoa(AuthLogicService.getSession('adminId')),
                'authorization-token': AuthLogicService.getSession('adminToken'),
            }), reportProgress: true
        };

        let data = new FormData();
        data.append('file', file);

        return this.http.request<any>(new HttpRequest('POST', [this.URLHost + 'admin/fileUpload' + `?Authorization-id=${btoa(AuthLogicService.getSession('adminId'))}&Authorization-token=${AuthLogicService.getSession('adminToken')}&encode=${encode}`].join(' '), data, headers));
    }

    public static fileUploadArchiveFile(file, dataCreate) {
        let headers: any = {
            headers: new HttpHeaders({
                'Authorization-id': btoa(AuthLogicService.getSession('adminId')),
                'Authorization-token': AuthLogicService.getSession('adminToken'),
            }), reportProgress: true
        };

        let data = new FormData();
        data.append('archiveParentId', dataCreate.archiveParentId);
        data.append('archiveName', dataCreate.archiveName);
        data.append('archiveDescription', (dataCreate.archiveDescription) ? dataCreate.archiveDescription : '')
        data.append('archiveType', '1');
        data.append('file', file);

        return this.http.request<any>(new HttpRequest('POST', [this.URLHost + 'createArchiveWithFormData'].join(' '), data, headers));
    }

    public static getBaseDirFiles(pathFile: string, fileName: string, mode: string = 'attachment', encode: boolean = true) {
        return [this.URLHost + pathFile + '?filename=' + fileName + '&mode=' + mode + '&encode=' + encode + `&Authorization-id=${btoa(AuthLogicService.getSession('adminId'))}&Authorization-token=${AuthLogicService.getSession('adminToken')}`].join(' ');
    }

    public static getBaseDirFilesQrCode(id: string, mode: string = 'inline') {
        return [this.URLHost + 'admin/getQRCodeImageUsersMeetingById/' + id + '?mode=' + mode + `&Authorization-id=${btoa(AuthLogicService.getSession('adminId'))}&Authorization-token=${AuthLogicService.getSession('adminToken')}` + '&random=' + Math.random()].join(' ');
    }

    public static getBaseDirFilesPublic(fileName: string, mode: string = 'inline') {
        return [this.URLHost + 'public/getFileCompany' + '?filename=' + fileName + '&mode=' + mode].join(' ');
    }

}
