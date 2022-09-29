import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicPageRouting } from './public-page.routing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        PublicPageRouting,
        TooltipModule.forRoot()
    ],
    declarations: [
        ResetPasswordComponent,
        RegisterAdminComponent
    ]
})

export class PublicPageModule {

}
