import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [
    // { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'reset-password', component: ResetPasswordComponent, pathMatch: 'full' },
    { path: 'register-admin/:token', component: RegisterAdminComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicPageRouting { }


