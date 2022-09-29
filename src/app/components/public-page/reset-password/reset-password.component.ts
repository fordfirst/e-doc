import { AuthService } from '@/aurhService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from './reset-password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        email: new FormControl(),
        token: new FormControl(),
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl(),
    });

    token: any;
    email: any;

    isShowNewPassword: boolean = false;
    isShowConfirmNewPassword: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private service: ResetPasswordService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParamMap.get('Authorization') && this.route.snapshot.queryParamMap.get('email')) {
            this.token = this.route.snapshot.queryParamMap.get('Authorization');
            this.email = this.route.snapshot.queryParamMap.get('email');
            this.form.get('token').setValue(this.token);
            this.form.get('email').setValue(this.email);
        }
    }

    async submitResetPassword() {
        try {
            this.spinner.show();
            await this.service.resetPassword(this.form.value);
            this.toastr.success('รีเซ็ตรหัสผ่านสำเร็จ', 'SUCCESS');
            this.router.navigate(["auth/login"]);
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        }
    }

}
