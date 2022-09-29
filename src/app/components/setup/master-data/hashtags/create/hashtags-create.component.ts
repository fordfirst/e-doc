import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HashtagsCreateService } from './hashtags-create.service';

@Component({
    selector: 'app-master-data-hashtags-create',
    templateUrl: './hashtags-create.component.html',
    styleUrls: ['./hashtags-create.component.scss']
})
export class MasterDataHashtagsCreateComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        nameTh: new FormControl(),
        nameEn: new FormControl()
    });

    constructor(
        private spinner: NgxSpinnerService,
        private service: HashtagsCreateService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() { }

    async submitCreateHashtag() {
        try {
            this.spinner.show();
            await this.service.createHashtag(this.form.value);
            this.toastr.success('สร้างแฮชแท็ก', 'SUCCESS');
            this.spinner.hide();
            this.router.navigate(["setup/master-data/hashtags"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
