import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SetupComponent } from './setup.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { MasterDataBrandComponent } from './master-data/brand/brand.component';
import { MasterDataBrandCreateComponent } from './master-data/brand/create/brand-create.component';
import { MasterDataBusinessComponent } from './master-data/business/business.component';
import { MasterDataBusinessCreateComponent } from './master-data/business/create/business-create.component';
import { MasterDataHashtagsComponent } from './master-data/hashtags/hashtags.component';
import { MasterDataHashtagsCreateComponent } from './master-data/hashtags/create/hashtags-create.component';
import { MasterDataVoucherComponent } from './master-data/voucher/voucher.component';
import { MasterDataVoucherCreateComponent } from './master-data/voucher/create/voucher-create.component';
import { MasterDataBrandEditComponent } from './master-data/brand/edit/brand-edit.component';
import { MasterDataBusinessEditComponent } from './master-data/business/edit/business-edit.component';
import { MasterDataHashtagsEditComponent } from './master-data/hashtags/edit/hashtags-edit.component';
import { MasterDataVoucherEditComponent } from './master-data/voucher/edit/voucher-edit.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { ScoreVoteComponent } from './score-vote/score-vote.component';

const routes: Routes = [
    { path: '', component: SetupComponent, pathMatch: 'full' },
    { path: 'master-data', component: MasterDataComponent, pathMatch: 'full' },
    { path: 'role-permission', component: RolePermissionComponent, pathMatch: 'full' },
    { path: 'score-vote', component: ScoreVoteComponent, pathMatch: 'full' },

    { path: 'master-data/brand', component: MasterDataBrandComponent, pathMatch: 'full' },
    { path: 'master-data/brand/create', component: MasterDataBrandCreateComponent, pathMatch: 'full' },
    { path: 'master-data/brand/edit/:id', component: MasterDataBrandEditComponent, pathMatch: 'full' },

    { path: 'master-data/business', component: MasterDataBusinessComponent, pathMatch: 'full' },
    { path: 'master-data/business/create', component: MasterDataBusinessCreateComponent, pathMatch: 'full' },
    { path: 'master-data/business/edit/:id', component: MasterDataBusinessEditComponent, pathMatch: 'full' },

    { path: 'master-data/hashtags', component: MasterDataHashtagsComponent, pathMatch: 'full' },
    { path: 'master-data/hashtags/create', component: MasterDataHashtagsCreateComponent, pathMatch: 'full' },
    { path: 'master-data/hashtags/edit/:id', component: MasterDataHashtagsEditComponent, pathMatch: 'full' },

    { path: 'master-data/voucher', component: MasterDataVoucherComponent, pathMatch: 'full' },
    { path: 'master-data/voucher/create', component: MasterDataVoucherCreateComponent, pathMatch: 'full' },
    { path: 'master-data/voucher/edit/:id', component: MasterDataVoucherEditComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupRouting { }


