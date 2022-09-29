import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BusinessCreateService } from './business-create.service';

@Component({
    selector: 'app-master-data-business-create',
    templateUrl: './business-create.component.html',
    styleUrls: ['./business-create.component.scss']
})
export class MasterDataBusinessCreateComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        nameTh: new FormControl(),
        nameEn: new FormControl(),
        code: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: BusinessCreateService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() { }

    async submitCreateBusiness() {
        try {
            this.spinner.show();
            await this.service.createBusinessGroup(this.form.value);
            this.toastr.success('สร้างกลุ่มธุรกิจ', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/business"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
