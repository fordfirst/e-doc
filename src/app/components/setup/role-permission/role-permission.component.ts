import { FormHelperModule } from '@/formHelper.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RolePermissionService } from './role-permission.service';

@Component({
    selector: 'app-role-permission',
    templateUrl: './role-permission.component.html',
    styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit {

    @ViewChild('changeStatusAdminModal') changeStatusAdminModal;
    @ViewChild('removeAdiminModal') removeAdiminModal;
    @ViewChild('createAdiminModal') createAdiminModal;

    isIndexTab: number = 1;
    search = {
        adminRoleId: null,
        direction: null
    };

    countAdminRoleList: any = [];
    adminRoleList: any = [];

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'businessGroupName',
        'code',
        'name',
        'email',
        'adminRoleName',
        'create',
        'update',
        'btnManage'
    ];

    dataChangeStatusAdmin = {
        id: null,
        adminRoleId: null
    };

    dataDeleteAdmin = {
        id: null,
        name: null
    };

    submitted: boolean = false;
    form = new FormGroup({
        email: new FormControl(),
        adminRoleId: new FormControl(),
    });

    submittedChangeRole: boolean = false;
    formChangeRole = new FormGroup({
        id: new FormControl(),
        adminRoleId: new FormControl()
    });

    constructor(
        private service: RolePermissionService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,

    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ตั้งค่า', url: '/setup' },
            { name: 'ข้อมูลผู้ช่วยดูแลระบบ', url: '/setup/role-permission' },
        ]));

        await this.getAllCountAdminRoleList();
        await this.getAllAdminRoleList();
        await this.getAllListDataTable();

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
                case 'adminRoleName': return item.adminRole ? item.adminRole.name : '-' || '-';
                case 'businessGroupName': return item.businessGroup ? item.businessGroup.nameTh : '-' || '-';
                default: return item[property];
            }
        };
    }

    changeTabs(index) {
        this.isIndexTab = index;
        this.getAllListDataTable();
    }

    async getAllListDataTable() {
        try {
            this.dataSource.data = [];
            let result: any;

            if (this.isIndexTab === 1) { result = await this.service.getAllSearchAdmin(this.search, true); }
            if (this.isIndexTab === 2) { result = await this.service.getAllSearchAdmin(this.search, false); }

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

    async getAllAdminRoleList() {
        try {
            this.adminRoleList = await this.service.getAllAdminRole();
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCountAdminRoleList() {
        try {
            this.countAdminRoleList = await this.service.getAllCountAdminRole();
        } catch (error) {
            console.log(error);
        }
    }

    openChangeStatusAdmin(dataRow) {
        this.formChangeRole.reset();
        this.submittedChangeRole = false;
        this.formChangeRole.setValue({
            id: dataRow.id,
            adminRoleId: dataRow.adminRoleId
        });
        this.changeStatusAdminModal.show();
    }

    async submitChangeStatusAdmin() {
        try {
            this.spinner.show();
            await this.service.changeRoleAdmin(this.formChangeRole.value);
            await this.getAllListDataTable();
            await this.getAllCountAdminRoleList();
            this.spinner.hide();
            this.changeStatusAdminModal.hide();
            this.toastr.success('เปลี่ยนสถานะสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    openDeleteAdminModal(dataRow) {
        this.dataDeleteAdmin.id = dataRow.id;
        this.dataDeleteAdmin.name = dataRow.name;
        this.removeAdiminModal.show();
    }

    async submitDeleteAdimin() {
        this.spinner.show();
        try {
            await this.service.deleteAdmin(this.dataDeleteAdmin.id);
            await this.getAllCountAdminRoleList();
            await this.getAllListDataTable();
            this.removeAdiminModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบผู้ช่วยสำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    openCreateAdminModal() {
        this.form.reset();
        this.form.setValue({
            email: null,
            adminRoleId: null
        })
        this.createAdiminModal.show();
    }

    async submitCreateAdmin() {
        try {
            this.spinner.show();
            await this.service.requestRegisterAdmin(this.form.value);
            await this.getAllCountAdminRoleList();
            await this.getAllListDataTable();
            this.createAdiminModal.hide();
            this.toastr.success('เชิญผู้ช่วยสำเร็จ', 'SUCCESS');
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
