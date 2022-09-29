import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CampaignComponent } from './campaign.component';
import { CampaignCreateComponent } from './create/campaign-create.component';
import { CampaignDetailComponent } from './detail/campaign-detail.component';
import { CampaignEditComponent } from './edit/campaign-edit.component';

const routes: Routes = [
    { path: '', component: CampaignComponent, pathMatch: 'full' },
    { path: 'create', component: CampaignCreateComponent, pathMatch: 'full' },
    { path: 'detail/:id', component: CampaignDetailComponent, pathMatch: 'full' },
    { path: 'edit/:id', component: CampaignEditComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignRouting { }


