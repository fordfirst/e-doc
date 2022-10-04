import { AppState } from '@/store/state';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@components/auth/login/login.service';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { AuthLogicService } from '@services/authLogic.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar';
// const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;

    constructor(
        public appService: AppService,
        private store: Store<AppState>,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router,
        private loginServ: LoginService
    ) { }

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
    }

    async logout() {
        this.spinner.show();
        try {
            await this.loginServ.logout()
            AuthLogicService.sessionDestroy();
            this.router.navigate(['/auth/login']);
            this.spinner.hide();
        } catch (error) {
            console.log(error);
            this.spinner.hide();
        }
    }

}