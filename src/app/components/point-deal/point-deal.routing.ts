import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PointDealComponent } from './point-deal.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { EditDealComponent } from './edit-deal/edit-deal.component';

const routes: Routes = [
    { path: '', component: PointDealComponent, pathMatch: 'full' },
    { path: 'create-deal', component: CreateDealComponent, pathMatch: 'full' },
    { path: 'edit-deal/:id', component: EditDealComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointDealRouting { }


