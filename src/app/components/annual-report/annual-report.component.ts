import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '@services/fileUpload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AnnualReportService } from './annual-report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MyPdfViewerService } from '@/components-shared/my-pdf-viewer/my-pdf-viewer.service';

declare var $: any;

@Component({
    selector: 'app-annual-report',
    templateUrl: './annual-report.component.html',
    styleUrls: ['./annual-report.component.scss']
})
export class AnnualReportComponent implements OnInit {

    @ViewChild('createAnnualReportModal') createAnnualReportModal;
    @ViewChild('editAnnualReportModal') editAnnualReportModal;
    @ViewChild('deleteAnnualReportModal') deleteAnnualReportModal;

    FileUploadService = FileUploadService;
    isFileUploaded: boolean = true;
    isFileUploaded2: boolean = true;
    percentFileUploaded: number = 0;
    percentFileUploaded2: number = 0;

    submittedCreate: boolean = false;
    formCreate = new FormGroup({
        annualReportTitle: new FormControl(),
        annualReportFile: new FormControl(),
    });

    submittedEdit: boolean = false;
    formEdit = new FormGroup({
        annualReportId: new FormControl(),
        annualReportTitle: new FormControl(),
        annualReportFile: new FormControl(),
        status: new FormControl()
    });

    formDelete = {
        annualReportId: null,
        annualReportTitle: null
    }

    dataSource: any = new MatTableDataSource<any>();
    dspColumns: string[] = [
        'annualReportTitle',
        'annualReportCreate',
        'btnManage',
    ];
    search = { direction: null };

    constructor(
        private service: AnnualReportService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        public myPdfViewerService: MyPdfViewerService
    ) { }

    async ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'สร้างรายงานประจำปี', url: '/annual-report' },
        ]));
        await this.getAllSearchAnnualReport();
    }

    async getAllSearchAnnualReport() {
        try {
            this.dataSource.data = [];
            let result: any = await this.service.getAllSearchAnnualReport(this.search);
            this.dataSource.data = result && result.items && result.items.length ? result.items : [];
            console.log('Result : ', result);
        } catch (error) {
            console.log(error);
        }
    }

    onFileSelected(element, type: number) {
        try {
            let files = element.files[0];

            if (type == 1) {
                this.isFileUploaded = false;
                this.percentFileUploaded = 0;
            }
            if (type == 2) {
                this.isFileUploaded2 = false;
                this.percentFileUploaded2 = 0;
            }

            FileUploadService.fileUpload(files).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // This is an upload progress event. Compute and show the % done:
                    if (type == 1) { this.percentFileUploaded = Math.round(100 * event.loaded / event.total); }
                    if (type == 2) { this.percentFileUploaded2 = Math.round(100 * event.loaded / event.total); }

                } else if (event instanceof HttpResponse) {
                    let data: any = event.body;
                    if (data.error) {
                        this.toastr.error('Error Upload', 'ERROR');
                        return false;
                    }
                    if (type == 1) {
                        this.formCreate.get('annualReportFile').setValue(data.filename);
                    }
                    if (type == 2) {
                        this.formEdit.get('annualReportFile').setValue(data.filename);
                        this.formEdit.get('status').setValue(false);
                    }
                }
            }, (error: any) => {
                this.toastr.error('Error Upload', 'ERROR');
                if (type == 1) { this.isFileUploaded = true; }
                if (type == 2) { this.isFileUploaded2 = true; }
            }, () => {
                if (type == 1) { this.isFileUploaded = true; }
                if (type == 2) { this.isFileUploaded2 = true; }
            });
        } catch (error) {
            console.log(error);
        }
    }

    onRemoveFile(type: number) {
        if (type == 1) {
            $('input[type=file][name=file1]').val('');
            this.formCreate.get('annualReportFile').reset();
            this.submittedCreate = false;
        }
        if (type == 2) {
            $('input[type=file][name=file2]').val('');
            this.formEdit.get('annualReportFile').reset();
            this.formEdit.get('status').setValue(false);
            this.submittedEdit = false;
        }
    }

    openCreateAnnualReportModal() {
        this.formCreate.reset();
        this.submittedCreate = false;
        this.formCreate.setValue({
            annualReportTitle: null,
            annualReportFile: null,
        })
        this.createAnnualReportModal.show();
    }

    async submitCreateAnnualReport() {
        this.spinner.show();
        try {
            await this.service.createAnnualReport(this.formCreate.value);
            await this.getAllSearchAnnualReport();
            this.spinner.hide();
            this.createAnnualReportModal.hide();
            this.toastr.success('Create Report Success', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Create Report Fail', 'ERROR');
        }
    }

    openEditAnnualReportModal(dataRow) {
        this.formEdit.reset();
        this.submittedEdit = false;
        this.formEdit.setValue({
            annualReportId: dataRow.annualReportId,
            annualReportTitle: dataRow.annualReportTitle,
            annualReportFile: dataRow.annualReportFile ? dataRow.annualReportFile : null,
            status: dataRow.annualReportFile ? true : false
        });
        this.editAnnualReportModal.show();
    }

    async submitEditAnnualReport() {
        this.spinner.show();
        try {
            await this.service.editAnnualReport(this.formEdit.value);
            await this.getAllSearchAnnualReport();
            this.spinner.hide();
            this.editAnnualReportModal.hide();
            this.toastr.success('Edit Report Success', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Edit Report Fail', 'ERROR');
        }
    }

    openDeleteAnnualReportModal(dataRow) {
        this.formDelete.annualReportId = dataRow.annualReportId;
        this.formDelete.annualReportTitle = dataRow.annualReportTitle;
        this.deleteAnnualReportModal.show();
    }

    async submitDeleteAnnualReport() {
        this.spinner.show();
        try {
            await this.service.deleteAnnualReport(this.formDelete.annualReportId);
            await this.getAllSearchAnnualReport();
            this.spinner.hide();
            this.deleteAnnualReportModal.hide();
            this.toastr.success('Delete Report Success', 'SUCCESS');
        } catch (error) {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Delete Report Fail', 'ERROR');
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
