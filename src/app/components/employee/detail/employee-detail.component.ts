import { FormHelperModule } from '@/formHelper.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetailService } from './employee-detail.service';
import moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

    id;
    isIndexTab: number = 1;
    dataCustomerById = {
        balancePoint: 0,
        businessGroup: { nameTh: null },
        name: null,
        tel: null,
        email: null,
        address: null,
        district: { nameTh: null, zipCode: null },
        amphur: { nameTh: null },
        province: { nameTh: null }
    };
    dataSumPointCurrentYear = {
        burn: 0,
        earn: 0
    };
    search = { id: null, direction: null, transactionTypeId: null, startCreateDate: null, endCreateDate: null };
    dataVoteTypeList: any = [];

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'listName',
        'type',
        'point',
        'create',
    ];

    constructor(
        private service: EmployeeDetailService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            localStorage.setItem("navbar", JSON.stringify([
                { name: 'ข้อมูลพนักงาน', url: '/employee' },
                { name: 'รายละเอียดข้อมูล', url: `/employee/detail/${this.id}` }
            ]));
            this.search.id = this.id;
            await this.getCustomerById();
            await this.getSumPointCurrentYearTransactionByCustomerId();

            this.dataSource.filterPredicate = (data, filter: string) => {
                if (filter == 'all')
                    return true;

                const accumulator = (currentTerm, key) => {
                    return FormHelperModule.nestedFilterCheck(currentTerm, data, key);
                };
                let dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                // Transform the filter by converting it to lowercase and removing whitespace.
                const transformedFilter = filter.trim().toLowerCase();

                return dataStr.indexOf(transformedFilter) !== -1;
            };

            this.dataSource.sortingDataAccessor = (item, property) => {
                switch (property) {
                    case 'listName': return item.transactionTypeId === 1 ? item.comment : item.transactionTypeId === 2 ? item.voucher.name : '-' || '-';
                    case 'type': return item.transactionTypeId === 1 ? 'ใช้คะแนน' : item.transactionTypeId === 2 ? 'รับคะแนน' : '-' || '-';
                    default: return item[property];
                }
            };
        }
    }

    async getCustomerById() {
        try {
            this.spinner.show();
            this.dataCustomerById = await this.service.getCustomerById(this.id);
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async getSumPointCurrentYearTransactionByCustomerId() {
        try {
            this.spinner.show();
            this.dataSumPointCurrentYear = await this.service.getSumPointCurrentYearTransactionByCustomerId(this.id);
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async getAllSearchTransaction() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchTransaction(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }

            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllVoteTypeWithReportWithHiddenLoveByCustomerId() {
        try {
            this.dataVoteTypeList = [];
            this.dataVoteTypeList = await this.service.getAllVoteTypeWithReportWithHiddenLoveByCustomerId(this.id);
        } catch (error) {
            console.log(error);
        }
    }

    changeTabs(index) {
        this.isIndexTab = index;
        if (index === 2) {
            this.getAllSearchTransaction();
        }
        if (index === 3) {
            this.getAllVoteTypeWithReportWithHiddenLoveByCustomerId();
        }
    }

    async onDateChange(event) {
        if (event && event.length == 2) {
            this.search.startCreateDate = moment(event[0]).format('YYYY-MM-DD');
            this.search.endCreateDate = moment(event[1]).format('YYYY-MM-DD');
            await this.getAllSearchTransaction();
        } else {
            this.search.startCreateDate = null;
            this.search.endCreateDate = null;
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
