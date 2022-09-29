import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandCreateService } from './brand-create.service';

@Component({
    selector: 'app-master-data-brand-create',
    templateUrl: './brand-create.component.html',
    styleUrls: ['./brand-create.component.scss']
})
export class MasterDataBrandCreateComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: BrandCreateService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() { }

    async submitCreateBrand() {
        try {
            this.spinner.show();
            await this.service.createBrand(this.form.value);
            this.toastr.success('สร้างแบรนด์', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/brand"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
