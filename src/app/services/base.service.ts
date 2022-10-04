import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthLogicService } from '../services/authLogic.service';

@Injectable()
export class BaseService {
    
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization-id': btoa(AuthLogicService.getSession('adminId')),
            'Authorization-token': AuthLogicService.getSession('adminToken')
        })
    };

    httpOptionsNotValue = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization-id': '',
            'Authorization-token': ''
        })
    };

    httpOptionsBlob = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization-id': btoa(AuthLogicService.getSession('adminId')),
            'Authorization-token': AuthLogicService.getSession('adminToken'),
            // 'responseType': "blob"
        })
    };

    constructor() {
    }

}
