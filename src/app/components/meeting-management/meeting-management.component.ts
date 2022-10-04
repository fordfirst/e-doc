import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '@services/fileUpload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { MyPdfViewerService } from '@/components-shared/my-pdf-viewer/my-pdf-viewer.service';
import { MeetingManagementService } from './meeting-management.service';

declare var $: any;

@Component({
    selector: 'app-meeting-management',
    templateUrl: './meeting-management.component.html',
    styleUrls: ['./meeting-management.component.scss']
})
export class MeetingManagementComponent implements OnInit {

    constructor(
        private service: MeetingManagementService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'รายการประชุม', url: '/meeting-management' },
        ]));
    }

}
