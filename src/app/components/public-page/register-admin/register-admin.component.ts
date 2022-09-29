import { AuthService } from '@/aurhService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterAdminService } from './register-admin.service';

@Component({
    selector: 'app-register-admin',
    templateUrl: './register-admin.component.html',
    styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        token: new FormControl(),
        email: new FormControl(),
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl(),
        name: new FormControl(),
        businessGroupId: new FormControl(),
        code: new FormControl(),
    });

    token: any;
    email: any;

    isShowNewPassword: boolean = false;
    isShowConfirmNewPassword: boolean = false;

    businessGroupList: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private spinner: NgxSpinnerService,
        private service: RegisterAdminService,
        private toastr: ToastrService
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('token') && this.route.snapshot.queryParamMap.get('email')) {
            await this.getAllSearchBusinessGroup();

            this.token = this.route.snapshot.paramMap.get('token');
            this.email = this.route.snapshot.queryParamMap.get('email');
            this.form.get('token').setValue(this.token);
            this.form.get('email').setValue(this.email);
        }
    }

    async getAllSearchBusinessGroup() {
        try {
            let result:any = await this.service.getAllSearchBusinessGroup();
            if (result && result.items && result.items.length) {
                this.businessGroupList = result.items;
            } else { this.businessGroupList = []; }
        } catch (error) {
            console.log(error);
        }
    }

    async submitRegisterAdmin() {
        try {
            this.spinner.show();
            await this.service.registerAdmin(this.form.value);
            this.toastr.success('ยืนยันผู้ช่วยสำเร็จ', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["auth/login"]);
        } catch (error) {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        }
    }

}
