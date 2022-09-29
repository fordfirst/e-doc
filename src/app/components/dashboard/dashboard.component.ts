import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { FormHelperModule } from '@/formHelper.module';
import { DashboardService } from './dashboard.service';
import { ChartOptions } from 'chart.js';
import moment from 'moment';
import { environment } from 'environments/environment';
import { AuthService } from '@/aurhService';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    isChart: boolean = false;
    chartDataSets = [
        {
            data: [],
            lineTension: 0.4, /* Smooth Line */
            // backgroundColor: '#7AD080',
            borderColor: '#7AD080',
            pointBackgroundColor: '#7AD080',
            // pointBorderColor: '#7AD080',
        },
    ];
    chartLabels = [];
    chartOptions: ChartOptions = {
        responsive: true,
        // scales: { x: { display: false } }
    };
    currentYear;

    search = { monthYear: null }
    month = ['', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    dataMonthYearList: any = [];

    dataEarnBurn = { earnThisMonth: 0, burnThisMonth: 0, earnTotal: 0, burnTotal: 0 };

    numAccess: any = 0;
    dataChartList: any = [];

    dataCampaign = { totalPosts: 0, totalViews: 0, totalComments: 0, totalLikes: 0, totalShares: 0 }

    dataDealList: any = [];
    dataUserRankList: any = [];

    constructor(
        private service: DashboardService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private authService: AuthService,
    ) { }

    async ngOnInit() {
        this.currentYear = moment().year();
        localStorage.setItem("navbar", JSON.stringify([{ name: 'Dashboard', url: '/dashboard' }]));
        await this.getMonthYearList();
        await this.getAllSearchDataDashboard();
    }

    getBaseDirFilesServ(fileName: string, mode: string = 'inline') {
        return [environment.serviceUrl + 'common/downloadProfileImageFile' + '?file=' + fileName + '&mode=' + mode + '&Authorization=' + this.authService.getAccessToken()].join(' ');
    }

    async getMonthYearList() {
        try {
            this.dataMonthYearList = await this.service.getAllPeriodExcelReportTransaction();
        } catch (error) {
            console.log(error);
        }
    }

    async getAllSearchDataDashboard() {
        try {
            await this.getTransactionReportByYearAndMonth();
            await this.getAllVisitCountOfMonthReportByYear();
            await this.getPostReportByYearAndMonth();
            await this.getAllTransactionVoucherRankReportByYearAndMonth();
            await this.getAllVisitCountRankReportByYearAndMonth();
        } catch (error) {
            console.log(error);
        }
    }

    async getTransactionReportByYearAndMonth() {
        try {
            this.dataEarnBurn = { earnThisMonth: 0, burnThisMonth: 0, earnTotal: 0, burnTotal: 0 };
            this.dataEarnBurn = await this.service.getTransactionReportByYearAndMonth(this.search);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllVisitCountOfMonthReportByYear() {
        try {
            this.isChart = false;
            this.numAccess = 0;
            this.chartDataSets[0].data = [];
            this.chartLabels = [];
            this.dataChartList = await this.service.getAllVisitCountOfMonthReportByYear(this.search);
            for (const i in this.dataChartList) {
                const prop = this.dataChartList[i];
                this.chartDataSets[0].data.push(prop.count);
                this.numAccess += prop.countPerson;
                this.chartLabels.push(`${this.month[prop.month]} ${prop.year}`);
            }
            this.isChart = true;
        } catch (error) {
            console.log(error);
            this.isChart = true;
        }
    }

    async getPostReportByYearAndMonth() {
        try {
            this.dataCampaign = { totalPosts: 0, totalViews: 0, totalComments: 0, totalLikes: 0, totalShares: 0 }
            this.dataCampaign = await this.service.getPostReportByYearAndMonth(this.search);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllTransactionVoucherRankReportByYearAndMonth() {
        try {
            this.dataDealList = [];
            this.dataDealList = await this.service.getAllTransactionVoucherRankReportByYearAndMonth(this.search);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllVisitCountRankReportByYearAndMonth() {
        try {
            this.dataUserRankList = [];
            this.dataUserRankList = await this.service.getAllVisitCountRankReportByYearAndMonth(this.search);
        } catch (error) {
            console.log(error);
        }
    }





}
