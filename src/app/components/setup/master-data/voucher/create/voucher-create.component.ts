import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoucherCreateService } from './voucher-create.service';

@Component({
    selector: 'app-master-data-voucher-create',
    templateUrl: './voucher-create.component.html',
    styleUrls: ['./voucher-create.component.scss']
})
export class MasterDataVoucherCreateComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: VoucherCreateService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() { }

    async submitCreateVoucher() {
        try {
            this.spinner.show();
            await this.service.createVoucherCatalog(this.form.value);
            this.toastr.success('สร้างประเภท E-Voucher', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/voucher"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
