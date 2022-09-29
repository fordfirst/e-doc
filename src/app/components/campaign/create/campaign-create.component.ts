import { AuthService } from '@/aurhService';
import { FileUploadService } from '@/fileUpload.service';
import { FormHelperModule } from '@/formHelper.module';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignCreateService } from './campaign-create.service';

declare var $: any;

@Component({
    selector: 'app-campaign-create',
    templateUrl: './campaign-create.component.html',
    styleUrls: ['./campaign-create.component.scss']
})
export class CampaignCreateComponent implements OnInit {

    @ViewChild('previewCampaignModal') previewCampaignModal;

    isIndexContent: number = 1;
    hashtagList: any = [];
    previewModal: boolean = false;

    submitted: boolean = false;
    form = new FormGroup({
        postTypeId: new FormControl(),
        image: new FormControl(),
        titleTh: new FormControl(),
        contentTh: new FormControl(),
        url: new FormControl(),
        hashtags: new FormControl(),
        publishStatus: new FormControl(1),
        dateStart: new FormControl(),
        dateEnd: new FormControl(),
        postQuestions: new FormControl(),
        businessGroups: new FormControl(),
        scoreCriteria: new FormControl(),
        quota: new FormControl(),
        quotaPoint: new FormControl(),
        campaignStartDate: new FormControl(),
        campaignEndDate: new FormControl(),
    });

    isFileUploaded: boolean = true;
    percentFileUploaded: number = 0;

    questionChoice = [{
        question: null,
        postTypeAnswer: 1,
        postAnswers: [
            { answer: null, isCorrect: false },
            { answer: null, isCorrect: false }
        ]
    }];

    businessGroupList: any = [];

    constructor(
        private service: CampaignCreateService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private uploadServ: FileUploadService,
        private authService: AuthService,
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'รายการแคมเปญ', url: '/campaign' },
            { name: 'สร้างแคมเปญใหม่', url: '/campaign/create' }
        ]));
        await this.getAllSearchBusinessGroup();
        await this.getAllSearchHashtag();
    }

    changeContentCampaign(index) {
        this.isIndexContent = index;

        this.form.reset();
        this.submitted = false;
        this.form.setValue({
            postTypeId: null,
            image: null,
            titleTh: null,
            contentTh: null,
            url: null,
            hashtags: null,
            publishStatus: 1,
            dateStart: null,
            dateEnd: null,
            postQuestions: null,
            businessGroups: [],
            scoreCriteria: null,
            quota: null,
            quotaPoint: null,
            campaignStartDate: null,
            campaignEndDate: null,
        });
    }

    getBaseDirFilesServ(fileName: string, mode: string = 'inline') {
        return [environment.serviceUrl + 'common/downloadPostImageFile' + '?file=' + fileName + '&mode=' + mode + '&Authorization=' + this.authService.getAccessToken()].join(' ');
    }

    setValidationDate() {
        if (this.form.get('publishStatus').value !== 3) {
            this.form.get('dateStart').setValue(null);
            this.form.get('dateEnd').setValue(null);
        }
    }

    async getAllSearchBusinessGroup() {
        try {
            this.businessGroupList = [];
            let dataBusinessGroup: any = await this.service.getAllSearchBusinessGroup();
            this.businessGroupList = dataBusinessGroup && dataBusinessGroup.items && dataBusinessGroup.items.length ? dataBusinessGroup.items : [];
        } catch (error) {
            console.log(error);
        }

    }

    async getAllSearchHashtag() {
        try {
            this.hashtagList = [];
            let result: any = await this.service.getAllSearchHashtag();
            if (result && result.items && result.items.length) {
                this.hashtagList = result.items;
            } else { this.hashtagList = []; }
        } catch (error) {
            console.log(error);
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

                this.form.get('image').setValue(data.filename)
            }
        }, (error: any) => {
            this.toastr.error(error, 'ERROR');
            this.isFileUploaded = true;
        }, () => { this.isFileUploaded = true; })
    }

    onRemoveFile() {
        $('input[type=file][name=file]').val('');
        this.form.get('image').setValue('');
    }

    addQuestion() {
        this.questionChoice.push({
            question: null,
            postTypeAnswer: 1,
            postAnswers: [
                { answer: null, isCorrect: false },
                { answer: null, isCorrect: false }
            ]
        });
    }

    addChoice(index) {
        this.questionChoice[index].postAnswers.push({ answer: null, isCorrect: false });
    }

    handleChange(event, indexQuestion, indexChoice) {
        for (const key in this.questionChoice[indexQuestion].postAnswers) {
            const prop = this.questionChoice[indexQuestion].postAnswers[key];
            prop.isCorrect = false;
        }
        this.questionChoice[indexQuestion].postAnswers[indexChoice].isCorrect = event.isTrusted;
    }

    changeAnswerType(type, index) {
        if (type == 3) {
            this.questionChoice[index].postAnswers = [];
        }
    }

    async submitCreateCampaign() {
        try {
            if (!this.form.get('image').value) {
                this.toastr.error('กรุณาอัพโหลดรูปภาพ', 'ERROR');
            } else {
                this.spinner.show();
                this.form.get('postTypeId').setValue(this.isIndexContent);
                this.form.get('postQuestions').setValue(this.questionChoice);
                if (this.previewModal) {
                    this.spinner.hide();
                    this.previewCampaignModal.show();
                    this.previewModal = false;
                } else {
                    await this.service.createPost(this.form.value);
                    this.toastr.success('สร้างแคมเปญสำเร็จ', 'SUCCESS');
                    this.spinner.hide();
                    this.router.navigate(["campaign"]);
                }
            }
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
