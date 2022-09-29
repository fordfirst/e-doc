import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
    
    constructor() { }

    ngOnInit() {
        localStorage.setItem("navbar", JSON.stringify([{ name: 'ตั้งค่า', url: '/setup' }]));
     }

}
