import { AuthService } from '@/aurhService';
import { FileUploadService } from '@/fileUpload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateDealService } from './create-deal.service';

declare var $: any;

@Component({
    selector: 'app-create-deal',
    templateUrl: './create-deal.component.html',
    styleUrls: ['./create-deal.component.scss']
})
export class CreateDealComponent implements OnInit {

    submitted: boolean = false;
    form = new FormGroup({
        name: new FormControl(),
        nameEn: new FormControl(),
        benefit: new FormControl(),
        benefitEn: new FormControl(),
        conditionBenefit: new FormControl(),
        conditionBenefitEn: new FormControl(),

        bannerImage: new FormControl(),
        businessGroups: new FormControl(),
        brandId: new FormControl(),
        voucherCatalogId: new FormControl(),
        quota: new FormControl(),
        quotaPoint: new FormControl(),

        quotaStart: new FormControl(),
        quotaEnd: new FormControl(),
        isOnePermissionOnly: new FormControl(false),
        isActivate: new FormControl(true),
    });

    voucherCatalogList: any = [];
    brandList: any = [];
    businessGroupList: any = [];

    isFileUploaded: boolean = true;
    percentFileUploaded: number = 0;

    constructor(
        private spinner: NgxSpinnerService,
        private service: CreateDealService,
        private toastr: ToastrService,
        private uploadServ: FileUploadService,
        private authService: AuthService,
        private router: Router
    ) { }

    async ngOnInit() {
        await this.getAllDataListSelect();
    }

    getBaseDirFilesServ(fileName: string, mode: string = 'inline') {
        return [environment.serviceUrl + 'common/downloadVoucherImageFile' + '?file=' + fileName + '&mode=' + mode + '&Authorization=' + this.authService.getAccessToken()].join(' ');
    }

    async getAllDataListSelect() {
        this.spinner.show();
        try {
            this.voucherCatalogList = [];
            this.brandList = [];
            this.businessGroupList = [];

            let dataVoucherCatalog: any = await this.service.getAllSearchVoucherCatalog();
            let dataBrand: any = await this.service.getAllSearchBrand();
            let dataBusinessGroup: any = await this.service.getAllSearchBusinessGroup();

            if (dataVoucherCatalog && dataVoucherCatalog.items && dataVoucherCatalog.items.length) { this.voucherCatalogList = dataVoucherCatalog.items } else { this.voucherCatalogList = []; }
            if (dataBrand && dataBrand.items && dataBrand.items.length) { this.brandList = dataBrand.items } else { this.brandList = []; }
            if (dataBusinessGroup && dataBusinessGroup.items && dataBusinessGroup.items.length) { this.businessGroupList = dataBusinessGroup.items } else { this.businessGroupList = []; }

            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async submitCreateDeal() {
        try {
            if (!this.form.get('bannerImage').value) {
                this.toastr.error('กรุณาอัพโหลดรูปภาพประกอบ', 'ERROR');
            } else {
                this.spinner.show();
                await this.service.createVoucher(this.form.value);
                this.toastr.success('สร้างดีลสำเร็จ', 'SUCCESS');
                this.spinner.hide();
                this.router.navigate(["point-deal"]);
            }
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    onFileSelected(element) {
        if (!element.files.length)
            return;

        let formData = new FormData();
        formData.append('file', element.files[0]);

        this.isFileUploaded = false;
        this.percentFileUploaded = 0;

        this.uploadServ.fileUpload(formData).subscribe(async (event) => {
            if (event.type === HttpEventType.UploadProgress) {
                // This is an upload progress event. Compute and show the % done:
                this.percentFileUploaded = Math.round(100 * event.loaded / event.total);

            } else if (event instanceof HttpResponse) {
                let data: any = event.body;

                if (data.error) {
                    this.toastr.error(data.message, 'ERROR');
                    return false;
                }

                this.form.get('bannerImage').setValue(data.filename)
            }
        }, (error: any) => {
            this.toastr.error(error, 'ERROR');
            this.isFileUploaded = true;
        }, () => { this.isFileUploaded = true; })
    }

    onRemoveFile() {
        $('input[type=file][name=file]').val('');
        this.form.get('bannerImage').setValue('');
    }

    selectAllBusinessGroups() {
        this.form.get('businessGroups').setValue(this.businessGroupList);
    }

}
