import { FormHelperModule } from '@/formHelper.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignDetailService } from './campaign-detail.service';

declare var $: any;

@Component({
    selector: 'app-campaign-detail',
    templateUrl: './campaign-detail.component.html',
    styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

    @ViewChild('removeModal') removeModal;
    @ViewChild('removeCommentModal') removeCommentModal;

    id;
    isIndexTab: number = 1;
    dataPostById = {
        titleTh: null,
        viewsCounter: 0,
        likesCounter: 0,
        commentsCounter: 0,
        sharesCounter: 0,
        publishStatus: null,
        postTypeId: null,
        contentTh: null,
        campaignStartDate: null,
        campaignEndDate: null,
        quota: null,
        quotaPoint: null,
        update: null,
    };
    search = { id: null, direction: null };
    dataCommentDelete = { id: null, comment: null };

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'comment',
        'isShow',
        'btnManage'
    ];

    constructor(
        private service: CampaignDetailService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    async ngOnInit() {
        if (this.route.snapshot.paramMap.get('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.search.id = this.id;
            await this.getPostById();

            // this.dataSource.filterPredicate = (data, filter: string) => {
            //     if (filter == 'all')
            //         return true;

            //     const accumulator = (currentTerm, key) => {
            //         return FormHelperModule.nestedFilterCheck(currentTerm, data, key);
            //     };
            //     let dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            //     // Transform the filter by converting it to lowercase and removing whitespace.
            //     const transformedFilter = filter.trim().toLowerCase();

            //     return dataStr.indexOf(transformedFilter) !== -1;
            // };

            // this.dataSource.sortingDataAccessor = (item, property) => {
            //     switch (property) {
            //         case 'listName': return item.transactionTypeId === 1 ? item.comment : item.transactionTypeId === 2 ? item.voucher.name : '-' || '-';
            //         case 'type': return item.transactionTypeId === 1 ? 'ใช้คะแนน' : item.transactionTypeId === 2 ? 'รับคะแนน' : '-' || '-';
            //         default: return item[property];
            //     }
            // };

            localStorage.setItem("navbar", JSON.stringify([
                { name: 'รายการแคมเปญ', url: '/campaign' },
                { name: `${this.dataPostById.titleTh}`, url: `/campaign/detail/${this.id}` }
            ]));
        }
    }

    async getPostById() {
        try {
            this.spinner.show();
            this.dataPostById = await this.service.getPostById(this.id);
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

    async getAllSearchPostCommentByAdmin() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchPostCommentByAdmin(this.search);
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

    changeTabs(index) {
        this.isIndexTab = index;
        if (index === 2) {
            this.getAllSearchPostCommentByAdmin();
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDeleteModal(dataRow) {
        this.removeModal.show();
    }

    async submitDelete() {
        this.spinner.show();
        try {
            await this.service.deletePost(this.id);
            this.removeModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบแคมเปญสำเร็จ', 'SUCCESS');
            this.router.navigate(["campaign"]);
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

    async changeStatusCommentShowandHide(dataRow) {
        try {
            this.spinner.show();
            let result: any = dataRow.isShow ? await this.service.hidePostComment(dataRow.id) : await this.service.showPostComment(dataRow.id);
            await this.getAllSearchPostCommentByAdmin();
            this.spinner.hide();
            this.toastr.success('เปลี่ยนสถานะการเผยแพร่สำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.toastr.error(error, 'ERROR');
            this.spinner.hide();
        }
    }

    openDeleteCommentModal(dataRow) {
        this.dataCommentDelete.id = dataRow.id;
        this.dataCommentDelete.comment = dataRow.comment;
        this.removeCommentModal.show();
    }

    async submitDeleteComment() {
        this.spinner.show();
        try {
            await this.service.deletePostComment(this.dataCommentDelete.id);
            await this.getAllSearchPostCommentByAdmin();
            this.removeCommentModal.hide();
            this.spinner.hide();
            this.toastr.success('ลบคอมเมนต์สำเร็จ', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error(error, 'ERROR');
        }
    }

}
