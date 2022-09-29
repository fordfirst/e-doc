import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ManagePointComponent } from './manage-point.component';

const routes: Routes = [
    { path: '', component: ManagePointComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagePointRouting { }


