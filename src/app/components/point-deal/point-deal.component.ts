import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PointDealService } from './point-deal.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormHelperModule } from '@/formHelper.module';
import { AuthService } from '@/aurhService';


@Component({
    selector: 'app-point-deal',
    templateUrl: './point-deal.component.html',
    styleUrls: ['./point-deal.component.scss']
})
export class PointDealComponent implements OnInit {

    @ViewChild('removeDealModal') removeDealModal;
    @ViewChild('removeDealListModal') removeDealListModal;

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'select',
        'code',
        'test',
        'voucherCatalogName',
        'brandName',
        'name',
        'numQuota',
        'quotaPoint',
        'test2',
        'periodStatus',
        'isActivate',
        'btnManage'
    ];

    dataDeleteDeal = {
        id: null,
        name: null
    }

    voucherCatalogList: any = [];
    search = { VoucherCatalogId: null, direction: null };
    dataReport = {
        burnThisMonth: 0,
        burnTotal: 0,
        earnThisMonth: 0,
        earnTotal: 0
    };

    constructor(
        private service: PointDealService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        public authService: AuthService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([{ name: 'คะแนนและดีล', url: '/point-deal' }]));

        await this.getVoucherList();
        await this.getCurrentMonthTransactionReportList();
        await this.getAllDataListSelect();

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
                case 'voucherCatalogName': return item.voucherCatalog ? item.voucherCatalog.nameTh : '-' || '-';
                case 'brandName': return item.brand ? item.brand.nameTh : '-' || '-';
                default: return item[property];
            }
        };
        this.dspColumns = [1, 2, 3].indexOf(this.authService.getRole()) !== -1 ? this.dspColumns : this.dspColumns.slice(0, -1);
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.filteredData.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.filteredData.forEach(row => this.selection.select(row));
    }

    async getAllDataListSelect() {
        this.spinner.show();
        try {
            this.voucherCatalogList = [];
            let dataVoucherCatalog: any = await this.service.getAllSearchVoucherCatalog();
            if (dataVoucherCatalog && dataVoucherCatalog.items && dataVoucherCatalog.items.length) { this.voucherCatalogList = dataVoucherCatalog.items } else { this.voucherCatalogList = []; }
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async getVoucherList() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchVoucher(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCurrentMonthTransactionReportList() {
        try {
            this.dataReport = {
                burnThisMonth: 0,
                burnTotal: 0,
                earnThisMonth: 0,
                earnTotal: 0
            };
            let dataCurrentMonthTransactionReport: any = await this.service.getCurrentMonthTransactionReport();
            if (dataCurrentMonthTransactionReport) {
                this.dataReport = {
                    burnThisMonth: dataCurrentMonthTransactionReport.burnThisMonth,
                    burnTotal: dataCurrentMonthTransactionReport.burnTotal,
                    earnThisMonth: dataCurrentMonthTransactionReport.earnThisMonth,
                    earnTotal: dataCurrentMonthTransactionReport.earnTotal
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    openDeleteDealModal(dataRow) {
        this.dataDeleteDeal.id = dataRow.id;
        this.dataDeleteDeal.name = dataRow.name;
        this.removeDealModal.show();
    }

    async submitDeleteDeal() {
        this.spinner.show();
        try {
            await this.service.deleteVoucher(this.dataDeleteDeal.id);
            await this.getVoucherList();
            await this.getCurrentMonthTransactionReportList();
            this.removeDealModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบดีลสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async deleteVoucherList() {
        this.spinner.show();
        try {
            await this.service.deleteVouchers(this.selection.selected);
            await this.getVoucherList();
            await this.getCurrentMonthTransactionReportList();
            this.selection.clear();
            this.removeDealListModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    displayCutLine(words, num: number = 15) {
        let dot = '';
        if (words) { if (words.length > num) { dot = '...'; return words.substring(0, num) + dot; } }
        return words;
    }

}
