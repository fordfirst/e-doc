import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MeetingManagementComponent } from './meeting-management.component';

const routes: Routes = [
    { path: '', component: MeetingManagementComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetingManagementRouting { }


