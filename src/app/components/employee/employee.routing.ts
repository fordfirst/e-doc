import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './detail/employee-detail.component';

const routes: Routes = [
    { path: '', component: EmployeeComponent, pathMatch: 'full' },
    { path: 'detail/:id', component: EmployeeDetailComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRouting { }


