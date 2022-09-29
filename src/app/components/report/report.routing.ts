import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReportComponent } from './report.component';

const routes: Routes = [
    { path: '', component: ReportComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRouting { }


