import { AuthService } from '@/aurhService';
import { FormHelperModule } from '@/formHelper.module';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from './campaign.service';

declare var $: any;

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

    @ViewChild('removeModal') removeModal;

    isIndexTab: number = 1;

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    selection = new SelectionModel<any>(true, []);
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'postTypeId',
        'titleTh',
        'viewsCounter',
        'likesCounter',
        'sharesCounter',
        'commentsCounter',
        'dateStart',
        'update',
        'periodStatus',
        'btnManage',
    ];
    search = { direction: null, postTypeId: null };
    count = { publish: 0, draft: 0, delete: 0 };

    dataDelete = {
        id: null,
        titleTh: null
    }

    constructor(
        private service: CampaignService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        public authService:AuthService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([{ name: 'รายการแคมเปญ', url: '/campaign' }]));
        await this.getAllCountListPost();
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
                case 'businessGroupNameTh': return item.businessGroup ? item.businessGroup.nameTh : '-' || '-';
                default: return item[property];
            }
        };
        this.dspColumns = [1, 2, 3].indexOf(this.authService.getRole()) !== -1 ? this.dspColumns : this.dspColumns.slice(0, -1);
    }

    changeTabs(index) {
        this.isIndexTab = index;
        this.getAllListDataTable();
    }

    async getAllCountListPost() {
        try {
            this.count.publish = await this.service.getCountPostByPublish();
            this.count.draft = await this.service.getCountPostByDraft();
            this.count.delete = await this.service.getCountPostByDelete();
        } catch (error) {
            console.log(error);
        }
    }

    async getAllListDataTable() {
        try {
            this.dataSource.data = [];
            let result: any;

            if (this.isIndexTab === 1) { result = await this.service.getAllSearchPostByPublish(this.search); }
            if (this.isIndexTab === 2) { result = await this.service.getAllSearchPostByDraft(this.search); }
            if (this.isIndexTab === 3) { result = await this.service.getAllSearchPostByDelete(this.search); }

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

    async deleteEmployeeList() {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    openDeleteModal(dataRow) {
        this.dataDelete.id = dataRow.id;
        this.dataDelete.titleTh = dataRow.titleTh;
        this.removeModal.show();
    }

    async submitDelete() {
        this.spinner.show();
        try {
            await this.service.deletePost(this.dataDelete.id);
            await this.getAllCountListPost();
            await this.getAllListDataTable();
            this.removeModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบแคมเปญสำเร็จ', 'SUCCESS');
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
