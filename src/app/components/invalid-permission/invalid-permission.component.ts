import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-invalid-permission',
    templateUrl: './invalid-permission.component.html',
    styleUrls: ['./invalid-permission.component.scss']
})
export class InvalidPermissionComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    getHomepage() {
        this.router.navigate([environment.homepageUrl])
    }

}
