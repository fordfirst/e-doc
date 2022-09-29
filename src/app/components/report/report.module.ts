import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ReportRouting } from './report.routing';
import { ReportComponent } from './report.component';

@NgModule({
    imports: [
        CommonModule,
        ReportRouting,
        RouterModule,
        FormsModule, ReactiveFormsModule,
        NgbModule,
        ModalModule.forRoot(), /* import modal */
        MatCheckboxModule,
    ],
    declarations: [
        ReportComponent,
    ]

})
export class ReportModule { }
