import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    NgxExtendedPdfViewerService,
    PageRenderedEvent,
    PagesLoadedEvent,
    PdfLoadedEvent
} from 'ngx-extended-pdf-viewer';
import { MyPdfViewerService } from './my-pdf-viewer.service';
import { FileDecrypterService } from './FileDecrypter.service';

@Component({
    selector: 'app-my-pdf-viewer',
    templateUrl: './my-pdf-viewer.component.html',
    styleUrls: ['./my-pdf-viewer.component.scss']
})
export class MyPdfViewerComponent implements OnInit {

    @Input() titleName: string; // name of pdf ex pdfName
    @Input() fileNameDownload: string; // name of download file pdf ex pdfName.pdf
    @Input() isDecode: boolean; // decoder mode before reading pdf
    @Input() isTransactionDecoded: boolean = false; // status decoding
    @Output() isTransactionDecodedChange = new EventEmitter<boolean>(); // status decoding
    @Input() page = 1; // set page starter
    @Input() pdfQuery: any; // search text in pdf
    @Input() pdfSrc: string; // pdf data
    private pdfSrcBuffer: string;

    constructor(private route: ActivatedRoute,
        private ngxExtendedPdfViewerService: NgxExtendedPdfViewerService,
        private myPdfViewerService: MyPdfViewerService,
        private fileDecrypterService: FileDecrypterService) { }

    ngOnInit() {
    }

    async ngAfterViewInit() {
        // mapping input 2 way mode
        this.mappingInput();

        if (this.isDecode) {

            try {
                this.isTransactionDecodedChange.emit(this.isTransactionDecoded = false);
                this.pdfSrc = await this.fileDecrypterService.decryptThenURL(await this.myPdfViewerService.getDocumentEncoded(this.pdfSrcBuffer));
                this.isTransactionDecodedChange.emit(this.isTransactionDecoded = true);
            } catch (e) {
                console.log(e)
                this.isTransactionDecodedChange.emit(this.isTransactionDecoded = true);
            }

        } else
            this.pdfSrc = this.pdfSrcBuffer;



        // auto concat .pdf when filename don't have
        if (this.titleName)
            this.fileNameDownload = this.titleName + ([".pdf"].indexOf(this.titleName.toLowerCase()) === -1 ? '.pdf' : '');

        // ex highlight text
        // setTimeout(() => {
        //   this.ngxExtendedPdfViewerService.find("ประวัติศาสตร์", {highlightAll: true});
        // }, 4000);
    }

    public pageRender(result: any) {
        console.log(result);
    }

    public pageRendered(result: PageRenderedEvent) {
        console.log(result);

        // Add a "Confidential" Watermark in the page
        result.source.translate(200, 200);
        result.source.rotate(-0.25 * Math.PI);

        result.source.font = "90px Arial";
        result.source.fillStyle = "rgba(76, 130, 212,.2)";
        result.source.fillText("CONFIDENTIAL", 100, 50);
    }

    public pagesLoaded(result: PagesLoadedEvent) {
        console.log("pagesLoaded");
        console.log(result);
    }

    public pdfLoaded(result: PdfLoadedEvent) {
        if (this.pdfQuery) this.ngxExtendedPdfViewerService.find(this.pdfQuery, { highlightAll: true });
    }

    private mappingInput() {
        this.pdfSrcBuffer = this.route.snapshot.queryParamMap.get("url") ? atob(this.route.snapshot.queryParamMap.get("url")) : this.pdfSrc;
        this.titleName = this.route.snapshot.queryParamMap.get("titleName") ? this.route.snapshot.queryParamMap.get("titleName") : this.titleName;
        this.page = +this.route.snapshot.queryParamMap.get("page") ? +this.route.snapshot.queryParamMap.get("page") : this.page;
        this.isDecode = this.route.snapshot.queryParamMap.get("isDecode") ? (this.route.snapshot.queryParamMap.get("isDecode") == "true") : this.isDecode;
        this.pdfQuery = this.route.snapshot.queryParamMap.get("pdfQuery") ? this.route.snapshot.queryParamMap.get("pdfQuery") : this.pdfQuery;
    }
}
