import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './login.service';
import { AuthLogicService } from '@services/authLogic.service';
import { LanguageService } from '@services/language.service';
import { ConfigService } from '@services/config.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('forcePasswordModal') forcePasswordModal;

    isShowPassword: boolean = false;
    submitted: boolean = false;
    form = new FormGroup({
        adminUsername: new FormControl(),
        adminPassword: new FormControl(),
        language: new FormControl(),
    });

    submittedChangePassword: boolean = false;
    formChangePassword = new FormGroup({
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl(),
    });
    isShowPasswordNew: boolean = false;
    isShowPasswordConfirmNew: boolean = false;

    dataAuthorization: any;

    constructor(
        private service: LoginService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private configService: ConfigService,
    ) { }

    async ngOnInit() {
        this.form.get('language').setValue(LanguageService.getActiveLang());
    }

    async setLanguage() {
        try {
            await AuthLogicService.getSession('lang');
        } catch (error) {
            console.log(error);
        }
    }

    async onLanguageChange() {
        LanguageService.setActiveLang(this.form.get('language').value);
    }

    async submitLogin() {
        this.spinner.show();
        try {
            this.dataAuthorization = null;
            this.dataAuthorization = await this.service.authorization(this.form.value);
            await AuthLogicService.sessionCreate(this.dataAuthorization);
            await this.configService.updateToken();
            if (this.dataAuthorization && this.dataAuthorization.passwordExpire) {
                this.spinner.hide();
                this.forcePasswordModal.show();
            } else {
                const lastUrl: string = AuthLogicService.getSession('lastUrl');
                if (lastUrl) {
                    // clear cache last url
                    this.spinner.hide();
                    AuthLogicService.setSession('lastUrl', '');
                    this.router.navigate([lastUrl]);
                } else {
                    this.spinner.hide();
                    this.router.navigate(['/meeting-management']);
                }
            }
        } catch (error) {
            this.spinner.hide();
            AuthLogicService.sessionDestroy();
            console.log(error);
            this.toastr.error(error.error.message ? error.error.message : 'Not Found', 'ERROR');
        }
    }

}
