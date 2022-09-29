import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HashtagEditService } from './hashtags-edit.service';

@Component({
    selector: 'app-master-data-hashtags-edit',
    templateUrl: './hashtags-edit.component.html',
    styleUrls: ['./hashtags-edit.component.scss']
})
export class MasterDataHashtagsEditComponent implements OnInit {

    id;
    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: HashtagEditService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getHashtagById();
        }
    }

    async getHashtagById() {
        try {
            this.spinner.show();
            this.submitted = false;
            this.form.reset();

            let dataHashtagById: any = await this.service.getHashtagById(this.id);

            this.form.setValue({
                id: dataHashtagById.id,
                nameTh: dataHashtagById.nameTh,
                nameEn: dataHashtagById.nameEn
            });
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async submitEditHashtag() {
        try {
            this.spinner.show();
            await this.service.editHashtag(this.form.value);
            this.toastr.success('แก้ไขแฮชแท็ก', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/hashtags"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }



}
