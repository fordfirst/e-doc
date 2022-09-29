import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoucherEditService } from './voucher-edit.service';

@Component({
    selector: 'app-master-data-voucher-edit',
    templateUrl: './voucher-edit.component.html',
    styleUrls: ['./voucher-edit.component.scss']
})
export class MasterDataVoucherEditComponent implements OnInit {

    id;
    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: VoucherEditService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getVoucherCatalogById();
        }
    }

    async getVoucherCatalogById() {
        try {
            this.spinner.show();
            this.submitted = false;
            this.form.reset();

            let dataVoucherById: any = await this.service.getVoucherCatalogById(this.id);

            this.form.setValue({
                id: dataVoucherById.id,
                nameTh: dataVoucherById.nameTh,
                nameEn: dataVoucherById.nameEn
            });
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async submitEditVoucher() {
        try {
            this.spinner.show();
            await this.service.editVoucherCatalog(this.form.value);
            this.toastr.success('แก้ไขประเภท E-Voucher', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/voucher"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }



}
