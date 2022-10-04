import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPdfViewerComponent } from './my-pdf-viewer.component';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MyPdfViewerRoutingModule } from './my-pdf-viewer-routing.module';



@NgModule({
    declarations: [MyPdfViewerComponent],
    imports: [
        CommonModule,
        FormsModule,
        MyPdfViewerRoutingModule,

        NgxExtendedPdfViewerModule
    ], exports: [MyPdfViewerComponent]
})

export class MyPdfViewerModule { }
