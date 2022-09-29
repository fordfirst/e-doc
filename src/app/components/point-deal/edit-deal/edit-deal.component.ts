import { AuthService } from '@/aurhService';
import { FileUploadService } from '@/fileUpload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EditDealService } from './edit-deal.service';

declare var $: any;

@Component({
    selector: 'app-edit-deal',
    templateUrl: './edit-deal.component.html',
    styleUrls: ['./edit-deal.component.scss']
})
export class EditDealComponent implements OnInit {

    @ViewChild('cancelEditModal') cancelEditModal;
    @ViewChild('removeDealModal') removeDealModal;

    id;
    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
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
        isOnePermissionOnly: new FormControl(),
        periodStatus: new FormControl(),
        isActivate: new FormControl()
    });
    isCanEditAll: boolean = true;

    voucherCatalogList: any = [];
    brandList: any = [];
    businessGroupList: any = [];

    isFileUploaded: boolean = true;
    percentFileUploaded: number = 0;

    constructor(
        private spinner: NgxSpinnerService,
        private service: EditDealService,
        private toastr: ToastrService,
        private uploadServ: FileUploadService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getEditVoucherById();
            await this.getAllDataListSelect();
        }
    }

    getBaseDirFilesServ(fileName: string, mode: string = 'inline') {
        return [environment.serviceUrl + 'common/downloadVoucherImageFile' + '?file=' + fileName + '&mode=' + mode + '&Authorization=' + this.authService.getAccessToken()].join(' ');
    }

    async getEditVoucherById() {
        try {
            this.submitted = false;
            this.form.reset();

            let dataVoucherById: any = await this.service.getEditVoucherById(this.id);

            if (dataVoucherById) {
                this.isCanEditAll = dataVoucherById.isCanEditAll;
                this.form.setValue({
                    id: this.id,
                    name: dataVoucherById.voucher.name,
                    nameEn: dataVoucherById.voucher.nameEn,
                    benefit: dataVoucherById.voucher.benefit,
                    benefitEn: dataVoucherById.voucher.benefitEn,
                    conditionBenefit: dataVoucherById.voucher.conditionBenefit,
                    conditionBenefitEn: dataVoucherById.voucher.conditionBenefitEn,
                    bannerImage: dataVoucherById.voucher.bannerImage,
                    businessGroups: dataVoucherById.voucher.businessGroups,
                    brandId: dataVoucherById.voucher.brandId,
                    voucherCatalogId: dataVoucherById.voucher.voucherCatalogId,
                    quota: dataVoucherById.voucher.quota,
                    quotaPoint: dataVoucherById.voucher.quotaPoint,
                    quotaStart: moment(dataVoucherById.voucher.quotaStart, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                    quotaEnd: moment(dataVoucherById.voucher.quotaEnd, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                    isOnePermissionOnly: dataVoucherById.voucher.isOnePermissionOnly,
                    periodStatus: dataVoucherById.voucher.periodStatus,
                    isActivate: dataVoucherById.voucher.isActivate
                });
            }
        } catch (error) {
            console.log(error);
        }
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

    async submitEditDeal() {
        try {
            if (!this.form.get('bannerImage').value) {
                this.toastr.error('กรุณาอัพโหลดรูปภาพประกอบ', 'ERROR');
            } else {
                this.spinner.show();
                await this.service.editVoucher(this.form.value);
                this.spinner.hide();
                this.toastr.success('แก้ไขดีลสำเร็จ', 'SUCCESS');
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

    async submitDeleteDeal() {
        this.spinner.show();
        try {
            await this.service.deleteVoucher(this.id);
            this.removeDealModal.hide();
            this.spinner.hide();
            this.router.navigate(["point-deal"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    selectAllBusinessGroups() {
        this.form.get('businessGroups').setValue(this.businessGroupList);
    }

}
