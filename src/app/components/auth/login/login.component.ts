import { AuthService } from '@/aurhService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isShowPassword: boolean = false;
    submitted: boolean = false;
    form = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        isRememberMe: new FormControl(),
    });

    constructor(
        private authSer: AuthService,
        private service: LoginService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void { }

    async submitLogin() {
        try {
            this.spinner.show();
            this.form.get('isRememberMe').setValue(!this.form.get('isRememberMe').value ? false : true);
            await this.authSer.createSession(await this.authSer.authorization(this.form.value));
            await this.authSer.redirectionHomepage();
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        }
    }

}
