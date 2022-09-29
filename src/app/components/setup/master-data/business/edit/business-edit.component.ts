import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BusinessEditService } from './business-edit.service';

@Component({
    selector: 'app-master-data-business-edit',
    templateUrl: './business-edit.component.html',
    styleUrls: ['./business-edit.component.scss']
})
export class MasterDataBusinessEditComponent implements OnInit {

    id;
    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
        nameTh: new FormControl(),
        nameEn: new FormControl(),
        code: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: BusinessEditService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getBusinessGroupById();
        }
    }

    async getBusinessGroupById() {
        try {
            this.spinner.show();
            this.submitted = false;
            this.form.reset();

            let dataBusinessById: any = await this.service.getBusinessGroupById(this.id);

            this.form.setValue({
                id: dataBusinessById.id,
                nameTh: dataBusinessById.nameTh,
                nameEn: dataBusinessById.nameEn,
                code: dataBusinessById.code
            });
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async submitEditBusiness() {
        try {
            this.spinner.show();
            await this.service.editBusinessGroup(this.form.value);
            this.toastr.success('แก้ไขกลุ่มธุรกิจ', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/business"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }



}
