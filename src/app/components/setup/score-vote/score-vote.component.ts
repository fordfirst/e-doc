import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ScoreVoteService } from './score-vote.service';

@Component({
    selector: 'app-score-vote',
    templateUrl: './score-vote.component.html',
    styleUrls: ['./score-vote.component.scss']
})
export class ScoreVoteComponent implements OnInit {

    @ViewChild('createScoreVoteModal') createScoreVoteModal;
    @ViewChild('editScoreVoteModal') editScoreVoteModal;

    dataVoteSetting = {
        voteQuota: 0,
        voterScore: 0,
        applicantScore: 0,
        quotaLimit: 0
    };
    dataVoteTypeList: any = [];

    submittedCreate: boolean = false;
    formCreate = new FormGroup({
        name: new FormControl(),
        icon: new FormControl(),
        backgroundColor: new FormControl()
    });

    submittedEdit: boolean = false;
    formEdit = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        icon: new FormControl(),
        backgroundColor: new FormControl()
    });

    dataIconList = [
        'far fa-thumbs-up',
        'fas fa-users',
        'far fa-star',
        'far fa-smile-beam',
        'far fa-smile',
        'fas fa-seedling',
        'far fa-check-circle',
        'fas fa-bullseye',
        'fas fa-arrow-circle-up',
        'far fa-lightbulb',
        'far fa-comments',
        'far fa-heart',
    ];

    dataIconColorList = [
        '#FBB0B0',
        '#FBDDB0',
        '#FBF3B0',
        '#B0FBD2',
        '#B0E0FB',
        '#B0CEFB',
        '#ECB0FB',
        '#BAACEF',
        '#E1E1E1',
        '#FFFFFF'
    ]

    constructor(
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private service: ScoreVoteService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ตั้งค่า', url: '/setup' },
            { name: 'ค่านิยมในเครือ', url: '/setup/score-vote' },
        ]));

        await this.getVoteSettingList();
        await this.getVoteTypeForSettingList();
    }

    async getVoteSettingList() {
        try {
            this.dataVoteSetting = await this.service.getVoteSetting();
        } catch (error) {
            console.log(error);
        }
    }

    async editVoteSetting() {
        try {
            this.spinner.show();
            await this.service.editVoteSetting(this.dataVoteSetting);
            await this.getVoteSettingList();
            this.spinner.hide();
            this.toastr.success('บันทึกการโหวตสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async getVoteTypeForSettingList() {
        try {
            this.dataVoteTypeList = [];
            this.dataVoteTypeList = await this.service.getAllVoteTypeForSetting();
        } catch (error) {
            console.log(error);
        }
    }

    openCreateScoreVoteModal() {
        this.formCreate.reset();
        this.submittedCreate = false;
        this.formCreate.setValue({
            name: null,
            icon: null,
            backgroundColor: null
        });
        this.createScoreVoteModal.show();
    }

    async submitCreateVote() {
        try {
            if (!this.formCreate.get('icon').value) {
                this.toastr.error('กรุณาเลือกไอคอน', 'ERROR');
            } else if (!this.formCreate.get('backgroundColor').value) {
                this.toastr.error('กรุณาเลือกสีพื้นหลัง', 'ERROR');
            } else {
                this.spinner.show();
                await this.service.createVoteType(this.formCreate.value);
                await this.getVoteTypeForSettingList();
                this.createScoreVoteModal.hide();
                this.spinner.hide();
                this.toastr.success('สร้างการโหวตสำเร็จ', 'SUCCESS');
            }
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    openEditScoreVoteModal(dataRow) {
        this.formEdit.reset();
        this.submittedEdit = false;
        this.formEdit.setValue({
            id: dataRow.id,
            name: dataRow.name,
            icon: dataRow.icon,
            backgroundColor: dataRow.backgroundColor
        });
        this.editScoreVoteModal.show();
    }

    async submitEditVote() {
        try {
            if (!this.formEdit.get('icon').value) {
                this.toastr.error('กรุณาเลือกไอคอน', 'ERROR');
            } else if (!this.formEdit.get('backgroundColor').value) {
                this.toastr.error('กรุณาเลือกสีพื้นหลัง', 'ERROR');
            } else {
                this.spinner.show();
                await this.service.editVoteType(this.formEdit.value);
                await this.getVoteTypeForSettingList();
                this.editScoreVoteModal.hide();
                this.spinner.hide();
                this.toastr.success('แก้ไขโหวตสำเร็จ', 'SUCCESS');
            }
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async deleteVoteType() {
        try {
            this.spinner.show();
            await this.service.deleteVoteType(this.formEdit.get('id').value);
            await this.getVoteTypeForSettingList();
            this.editScoreVoteModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบโหวตสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
