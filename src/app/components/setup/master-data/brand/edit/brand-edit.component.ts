import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandEditService } from './brand-edit.service';

@Component({
    selector: 'app-master-data-brand-edit',
    templateUrl: './brand-edit.component.html',
    styleUrls: ['./brand-edit.component.scss']
})
export class MasterDataBrandEditComponent implements OnInit {

    id;
    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: BrandEditService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getBrandById();
        }
    }

    async getBrandById() {
        try {
            this.spinner.show();
            this.submitted = false;
            this.form.reset();

            let dataBrandById: any = await this.service.getBrandById(this.id);

            this.form.setValue({
                id: dataBrandById.id,
                nameTh: dataBrandById.nameTh,
                nameEn: dataBrandById.nameEn
            });
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async submitEditBrand() {
        try {
            this.spinner.show();
            await this.service.editBrand(this.form.value);
            this.toastr.success('แก้ไขแบรนด์', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/brand"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }



}
