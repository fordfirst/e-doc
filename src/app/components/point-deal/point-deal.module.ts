import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PointDealRouting } from './point-deal.routing';
import { PointDealComponent } from './point-deal.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { EditDealComponent } from './edit-deal/edit-deal.component';

@NgModule({
    imports: [
        CommonModule,
        PointDealRouting,
        RouterModule,
        FormsModule, ReactiveFormsModule,
        NgbModule,
        MatRadioModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule,
        NgSelectModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        PointDealComponent,
        CreateDealComponent,
        EditDealComponent
    ]

})
export class PointDealModule { }
