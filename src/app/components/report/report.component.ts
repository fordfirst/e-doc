import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from './report.service';
import { saveAs } from 'file-saver';
import moment from 'moment';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    @ViewChild('exportPointReportModal') exportPointReportModal;
    @ViewChild('exporEmployeeReportModal') exporEmployeeReportModal;
    @ViewChild('exporCampaignReportModal') exporCampaignReportModal;

    month = ['', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    momthList: any = [];
    selectMonthPoint: any = [];

    constructor(
        private service: ReportService,
        private spinner: NgxSpinnerService,
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([{ name: 'รายงาน', url: '/report' }]));

    }

    async openModalPointTransactionReport() {
        try {
            this.spinner.show();
            this.selectMonthPoint = [];
            this.momthList = [];
            this.momthList = await this.service.getAllPeriodExcelReportTransaction();
            this.spinner.hide();
            this.exportPointReportModal.show();
        } catch (error) {
            console.log(error);
        }
    }

    selectMonthPointReport(event, data) {
        if (event.checked) { this.selectMonthPoint.push(data); }
        else if (event.checked == false) {

            for (let i in this.selectMonthPoint) {
                let prop = this.selectMonthPoint[i];

                if (prop.year === data.year && prop.month === data.month) {
                    this.selectMonthPoint.splice(i, 1);
                }
            }
        } else { }
    }

    async downloadExcelPointReport() {
        try {
            this.spinner.show();
            let result: any = await this.service.generateExcelReportTransaction(this.selectMonthPoint);

            let blob: any = new Blob([result.body], { type: 'application/octet-stream' });
            saveAs(blob, `point_transaction_report_${moment().format('DD-MM-YYYY')}.xlsx`);
            this.exportPointReportModal.hide();
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async openModalEmployeeReport() {
        try {
            this.spinner.show();
            this.selectMonthPoint = [];
            this.momthList = [];
            this.momthList = await this.service.getAllPeriodExcelReportTransaction();
            this.spinner.hide();
            this.exporEmployeeReportModal.show();
        } catch (error) {
            console.log(error);
        }
    }

    async downloadExcelReportCustomer() {
        try {
            this.spinner.show();
            let result: any = await this.service.generateExcelReportCustomer(this.selectMonthPoint);

            let blob: any = new Blob([result.body], { type: 'application/octet-stream' });
            saveAs(blob, `employee_activity_enagegement_${moment().format('DD-MM-YYYY')}.xlsx`);
            this.exporEmployeeReportModal.hide();
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async openModalCampaignReport() {
        try {
            this.spinner.show();
            this.selectMonthPoint = [];
            this.momthList = [];
            this.momthList = await this.service.getAllPeriodExcelReportTransaction();
            this.spinner.hide();
            this.exporCampaignReportModal.show();
        } catch (error) {
            console.log(error);
        }
    }

    async downloadExcelReportCampaign() {
        try {
            this.spinner.show();
            let result: any = await this.service.generateExcelReportPost(this.selectMonthPoint);

            let blob: any = new Blob([result.body], { type: 'application/octet-stream' });
            saveAs(blob, `campaign_activity_report_${moment().format('DD-MM-YYYY')}.xlsx`);
            this.exporCampaignReportModal.hide();
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

}
