import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AnnualReportComponent } from './annual-report.component';

const routes: Routes = [
    { path: '', component: AnnualReportComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnnualReportRouting { }


