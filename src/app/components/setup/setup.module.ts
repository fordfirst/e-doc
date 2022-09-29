import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SetupRouting } from './setup.routing';
import { SetupComponent } from './setup.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { MasterDataBrandComponent } from './master-data/brand/brand.component';
import { MasterDataBrandCreateComponent } from './master-data/brand/create/brand-create.component';
import { MasterDataBusinessComponent } from './master-data/business/business.component';
import { MasterDataBusinessCreateComponent } from './master-data/business/create/business-create.component';
import { MasterDataHashtagsComponent } from './master-data/hashtags/hashtags.component';
import { MasterDataHashtagsCreateComponent } from './master-data/hashtags/create/hashtags-create.component';
import { MasterDataHashtagsEditComponent } from './master-data/hashtags/edit/hashtags-edit.component';
import { MasterDataVoucherComponent } from './master-data/voucher/voucher.component';
import { MasterDataVoucherCreateComponent } from './master-data/voucher/create/voucher-create.component';
import { MasterDataVoucherEditComponent } from './master-data/voucher/edit/voucher-edit.component';
import { MasterDataBrandEditComponent } from './master-data/brand/edit/brand-edit.component';
import { MasterDataBusinessEditComponent } from './master-data/business/edit/business-edit.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { ScoreVoteComponent } from './score-vote/score-vote.component';


@NgModule({
    imports: [
        CommonModule,
        SetupRouting,
        RouterModule,
        FormsModule, ReactiveFormsModule,
        NgbModule,
        ModalModule.forRoot(), /* import modal */
        MatCheckboxModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule

    ],
    declarations: [
        SetupComponent,
        MasterDataComponent,
        RolePermissionComponent,
        ScoreVoteComponent,

        MasterDataBrandComponent,
        MasterDataBrandCreateComponent,
        MasterDataBrandEditComponent,

        MasterDataBusinessComponent,
        MasterDataBusinessCreateComponent,
        MasterDataBusinessEditComponent,

        MasterDataHashtagsComponent,
        MasterDataHashtagsCreateComponent,
        MasterDataHashtagsEditComponent,

        MasterDataVoucherComponent,
        MasterDataVoucherCreateComponent,
        MasterDataVoucherEditComponent,
    ]

})
export class SetupModule { }
