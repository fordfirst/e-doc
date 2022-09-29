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
import { CampaignEditService } from './campaign-edit.service';
import moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-campaign-edit',
    templateUrl: './campaign-edit.component.html',
    styleUrls: ['./campaign-edit.component.scss']
})
export class CampaignEditComponent implements OnInit {

    @ViewChild('previewCampaignModal') previewCampaignModal;

    id;
    isIndexContent: number = null;
    hashtagList: any = [];
    previewModal: boolean = false;

    submitted: boolean = false;
    form = new FormGroup({
        id: new FormControl(),
        postTypeId: new FormControl(),
        image: new FormControl(),
        titleTh: new FormControl(),
        contentTh: new FormControl(),
        url: new FormControl(),
        hashtags: new FormControl(),
        publishStatus: new FormControl(),
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
        private service: CampaignEditService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private uploadServ: FileUploadService,
        private authService: AuthService,
    ) { }

    async ngOnInit() {
        await this.getAllSearchBusinessGroup()
        await this.getAllSearchHashtag();
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            await this.getEditPostById();
            this.submitted = false;

            localStorage.setItem("navbar", JSON.stringify([
                { name: 'รายการแคมเปญ', url: '/campaign' },
                { name: `${this.form.get('titleTh').value}`, url: `/campaign/edit/${this.id}` }
            ]));
        }
    }

    async getEditPostById() {
        try {
            this.questionChoice = [];

            let result: any = await this.service.getEditPostById(this.id);
            let resultQuestion = await this.service.getAllSearchPostQuestion(this.id);

            if (result && result.post) {
                this.isIndexContent = result.post.postTypeId;
                this.form.setValue({
                    id: this.id,
                    postTypeId: result.post.postTypeId,
                    image: result.post.image,
                    titleTh: result.post.titleTh,
                    contentTh: result.post.contentTh,
                    url: result.post.url,
                    hashtags: result.post.hashtags,
                    publishStatus: result.post.publishStatus,
                    dateStart: result.post.dateStart ? moment(result.post.dateStart, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
                    dateEnd: result.post.dateEnd ? moment(result.post.dateEnd, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
                    postQuestions: [],
                    businessGroups: result.post.businessGroups,
                    scoreCriteria: result.post.scoreCriteria,
                    quota: result.post.quota,
                    quotaPoint: result.post.quotaPoint,
                    campaignStartDate: result.post.campaignStartDate ? moment(result.post.campaignStartDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
                    campaignEndDate: result.post.campaignEndDate ? moment(result.post.campaignEndDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
                });
            }

            if (resultQuestion && resultQuestion.items && resultQuestion.items.length) {
                this.questionChoice = resultQuestion.items;
            } else {
                this.questionChoice = [];
            }
        } catch (error) {
            console.log(error);
        }
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
                this.hashtagList = result.items
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

    public compareObjects = (item, selected) => {
        if (item.id && selected.id) {
            return item.id === selected.id;
        }
        return false;
    };

    async submitEditCampaign() {
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
                    await this.service.editPost(this.form.value);
                    this.toastr.success('แก้ไขแคมเปญสำเร็จ', 'SUCCESS');
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
