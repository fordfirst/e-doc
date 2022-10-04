import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from './forget-password.service';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

    isSubmit: boolean = false;
    submitted: boolean = false;
    form = new FormGroup({
        email: new FormControl(),
        isMobile: new FormControl(false)
    });

    constructor(
        private service: ForgetPasswordService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void { }

    async submitForgetPassword() {
        try {
            this.spinner.show();
            await this.service.requestResetPassword(this.form.value);
            this.isSubmit = true;
            this.toastr.success('ส่งอีเมลสำเร็จ', 'SUCCESS');
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        }
    }

}
