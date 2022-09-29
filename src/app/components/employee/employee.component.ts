import { FormHelperModule } from '@/formHelper.module';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './employee.service';

declare var $: any;

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'businessGroupNameTh',
        'name',
        'tel',
        'email',
        'btnManage',
    ];
    search = { direction: null, businessGroupId: null };
    businessGroupList: any = [];

    constructor(
        private service: EmployeeService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ข้อมูลพนักงาน', url: '/employee' },
        ]));
        await this.getAllSearchCustomer();
        await this.getAllSearchBusinessGroup();

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
                case 'businessGroupNameTh': return item.businessGroup ? item.businessGroup.nameTh : '-' || '-';
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

    async getAllSearchCustomer() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchCustomer(this.search);
            if (result && result.items && result.items.length) {
                this.dataSource.data = result.items;
            } else {
                this.dataSource.data = [];
            }
        } catch (error) {
            console.log(error);
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

    async deleteEmployeeList() {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
