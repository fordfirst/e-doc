import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { CampaignRouting } from './campaign.routing';
import { CampaignComponent } from './campaign.component';
import { CampaignCreateComponent } from './create/campaign-create.component';
import { CampaignDetailComponent } from './detail/campaign-detail.component';
import { CampaignEditComponent } from './edit/campaign-edit.component';

@NgModule({
    imports: [
        CommonModule,
        CampaignRouting,
        RouterModule,
        FormsModule, ReactiveFormsModule,
        NgbModule,
        MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule,MatRadioModule,
        NgSelectModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
    ],
    declarations: [
        CampaignComponent,
        CampaignCreateComponent,
        CampaignDetailComponent,
        CampaignEditComponent
    ]

})
export class CampaignModule { }
