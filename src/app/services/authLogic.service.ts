import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthLogicService {

    constructor() { }

    /* session */
    public static sessionCreate(data: any): void {
        localStorage.setItem('adminId', data.adminId.toString());
        localStorage.setItem('adminUsername', data.adminUsername);
        localStorage.setItem('adminEmail', data.adminEmail);
        localStorage.setItem('adminName', data.adminName);
        localStorage.setItem('adminTel', data.adminTel);
        localStorage.setItem('adminIp', data.adminIp);
        localStorage.setItem('adminToken', data.adminToken);
        localStorage.setItem('adminExpirePassword', data.adminExpirePassword);
        localStorage.setItem('adminLastlogin', data.adminLastlogin);
        localStorage.setItem('adminRole', data.adminRole);
        localStorage.setItem('adminStatus', data.adminStatus);
        localStorage.setItem('passwordExpire', data.passwordExpire)
        localStorage.setItem('loggedIn', 'TRUE');
    }

    public static sessionDestroy(): void {
        localStorage.clear();
    }

    public static setSession(key: string, value: string) {
        return localStorage.setItem(key, value);
    }

    public static getSession(key: string): string {
        return localStorage.getItem(key);
    }

    public static isAuthorized(): boolean {
        return localStorage.getItem('loggedIn') === 'TRUE';
    }

    public static getHomePage(): string {
        return '/meeting-management';
    }
}
