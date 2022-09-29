import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoucherService } from './voucher.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-master-data-voucher',
    templateUrl: './voucher.component.html',
    styleUrls: ['./voucher.component.scss']
})
export class MasterDataVoucherComponent implements OnInit {

    @ViewChild('removeDataModal') removeDataModal;
    @ViewChild('removeDataListModal') removeDataListModal;

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'select',
        'nameTh',
        'create',
        'update',
        'btnManage'
    ];

    dataDelete = {
        id: null,
        nameTh: null
    }
    search = { direction: null };

    constructor(
        private service: VoucherService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ตั้งค่า', url: '/setup' },
            { name: 'สร้าง Master Data', url: '/setup/master-data' },
            { name: 'ประเภท E-Voucher', url: '/setup/master-data/voucher' }
        ]));
        await this.getVoucherList();
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

    async getVoucherList() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchVoucherCatalog(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteVoucherCatalogsList() {
        this.spinner.show();
        try {
            await this.service.deleteVoucherCatalogs(this.selection.selected);
            await this.getVoucherList();
            this.removeDataListModal.hide();
            this.selection.clear();
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

    openDeleteModal(dataRow) {
        this.dataDelete.id = dataRow.id;
        this.dataDelete.nameTh = dataRow.nameTh;
        this.removeDataModal.show();
    }

    async submitDelete() {
        this.spinner.show();
        try {
            await this.service.deleteVoucherCatalog(this.dataDelete.id);
            await this.getVoucherList();
            this.removeDataModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบประเภท E-Voucherสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
