import { AuthService } from '@/aurhService';
import { FileUploadService } from '@/fileUpload.service';
import { FormHelperModule } from '@/formHelper.module';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ManagePointService } from './manage-point.service';

declare var $: any;

@Component({
    selector: 'app-manage-point',
    templateUrl: './manage-point.component.html',
    styleUrls: ['./manage-point.component.scss']
})
export class ManagePointComponent implements OnInit {

    @ViewChild('uploadCSVModal') uploadCSVModal;
    @ViewChild('removeTransactionModal') removeTransactionModal;
    @ViewChild('removeTransactionListModal') removeTransactionListModal;

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'select',
        'company',
        'name',
        'create',
        'expire',
        'comment',
        'point',
        'btnManage'
    ];

    uploadExcel = {
        name: null,
        file: null
    };

    dataDeleteTransaction = {
        id: null,
        name: null
    }

    dataImportEarnList: any = [];
    search = { direction: null };

    dataReport = {
        burnThisMonth: 0,
        burnTotal: 0,
        earnThisMonth: 0,
        earnTotal: 0
    };

    constructor(
        private service: ManagePointService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private authService: AuthService,
        private uploadServ: FileUploadService,
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([{ name: 'จัดการคะแนน', url: '/manage-point' }]));
        await this.getCurrentMonthTransactionReportList();
        await this.getAllSearchTransaction();

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
                case 'company': return item.customer ? item.customer.company : '-' || '-';
                case 'name': return item.customer ? item.customer.name : '-' || '-';
                default: return item[property];
            }
        };
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

    async getAllSearchTransaction() {
        try {
            this.selection.clear();
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchTransaction(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getBaseFileEarnTemplateCplove() {
        return [environment.serviceUrl + 'common/downloadTemplateFile?file=earn_template_cplove.xlsx' + '&Authorization=' + this.authService.getAccessToken()].join(' ');
    }

    openUploadCSVModal() {
        this.dataImportEarnList = [];
        this.uploadExcel.name = null;
        this.uploadExcel.file = null;
        $('input[type=file][name=file]').val('');
        this.uploadCSVModal.show();
    }

    onFileSelected(element) {
        if (!element.files.length)
            return;

        let dataFile = element.files[0];
        this.uploadExcel.name = dataFile.name;
        this.uploadExcel.file = dataFile;
        this.dataImportEarnList = [];

        this.spinner.show();
        let formData = new FormData();
        formData.append('file', this.uploadExcel.file);

        this.uploadServ.fileUploadPreviewEarnExcel(formData).subscribe(async (event) => {
            if (event.type === HttpEventType.UploadProgress) {
                // This is an upload progress event. Compute and show the % done:
            } else if (event instanceof HttpResponse) {
                let data: any = event.body;
                if (data.error) {
                    this.toastr.error(data.message, 'ERROR');
                    return false;
                }
                this.spinner.hide();
                if (data.items && data.items.length) {
                    this.dataImportEarnList = data.items;
                } else {
                    this.dataImportEarnList = [];
                }
            }
        }, (error: any) => {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        });
    }

    onRemoveFile() {
        $('input[type=file][name=file]').val('');
        this.uploadExcel.name = null;
        this.uploadExcel.file = null;
    }

    async submitUploadExcel() {
        this.spinner.show();
        try {
            await this.service.earnImplementTransaction(this.dataImportEarnList);
            await this.getAllSearchTransaction();
            this.spinner.hide();
            this.uploadCSVModal.hide();
            this.toastr.success('นำเข้าข้อมูลสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async deleteTransactionList() {
        this.spinner.show();
        try {
            await this.service.deleteTransactions(this.selection.selected);
            await this.getAllSearchTransaction();
            this.removeTransactionListModal.hide();
            this.selection.clear();
            this.spinner.hide();
            this.toastr.success('ลบสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    openDeletTransactionModal(dataRow) {
        this.dataDeleteTransaction.id = dataRow.id;
        this.dataDeleteTransaction.name = dataRow.customer ? dataRow.customer.name : '-';
        this.removeTransactionModal.show();
    }

    async submitDeleteTransaction() {
        this.spinner.show();
        try {
            await this.service.deleteTransaction(this.dataDeleteTransaction.id);
            await this.getAllSearchTransaction();
            this.removeTransactionModal.hide();
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

}
