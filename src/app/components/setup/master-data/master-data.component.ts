import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-master-data',
    templateUrl: './master-data.component.html',
    styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

    createMasterDataList = [
        {
            name: 'กลุ่มธุรกิจ',
            router: '/setup/master-data/business'
        },
        {
            name: 'แบรนด์',
            router: '/setup/master-data/brand'
        },
        {
            name: 'ประเภท E-Voucher',
            router: '/setup/master-data/voucher'
        },
        {
            name: '# แฮชแท็ก',
            router: '/setup/master-data/hashtags'
        },
    ];

    constructor() { }

    ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([
            { name: 'ตั้งค่า', url: '/setup' },
            { name: 'สร้าง Master Data', url: '/setup/master-data' }
        ]));
    }

}
