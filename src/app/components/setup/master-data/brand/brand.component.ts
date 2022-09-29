import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './brand.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-master-data-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class MasterDataBrandComponent implements OnInit {
    
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
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private service: BrandService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ตั้งค่า', url: '/setup' },
            { name: 'สร้าง Master Data', url: '/setup/master-data' },
            { name: 'แบรนด์', url: '/setup/master-data/brand' }
        ]));
        await this.getBrandList();
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

    async getBrandList() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchBrand(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteBrandsList() {
        this.spinner.show();
        try {
            await this.service.deleteBrands(this.selection.selected);
            await this.getBrandList();
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
            await this.service.deleteBrand(this.dataDelete.id);
            await this.getBrandList();
            this.removeDataModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบแบรนด์สำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}