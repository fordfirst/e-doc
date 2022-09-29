import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { BlankComponent } from '@pages/blank/blank.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { MainMenuComponent } from '@pages/main-menu/main-menu.component';
import { SubMenuComponent } from '@pages/main-menu/sub-menu/sub-menu.component';
import { GuardService } from './guard.service';
import { GuardLoginService } from './guard-login.service';
import { InvalidPermissionComponent } from '@components/invalid-permission/invalid-permission.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { Role } from './aurhService';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '', redirectTo: '/auth/login', pathMatch: 'full'
            }, 
            {
                path: 'point-deal', loadChildren: () => import('./components/point-deal/point-deal.module').then(mod => mod.PointDealModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.CONTENT_ADMIN, Role.VIEWER] }
                /* SUPER_ADMIN=1 ADMIN=2 CONTENT_ADMIN=3 VIEWER=4 */
            },
            {
                path: 'report', loadChildren: () => import('./components/report/report.module').then(mod => mod.ReportModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN] }
            },
            {
                path: 'manage-point', loadChildren: () => import('./components/manage-point/manage-point.module').then(mod => mod.ManagePointModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN] }
            },
            {
                path: 'setup', loadChildren: () => import('./components/setup/setup.module').then(mod => mod.SetupModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN] }
            },
            {
                path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN] }
            },
            {
                path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(mod => mod.EmployeeModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN] }
            },
            {
                path: 'campaign', loadChildren: () => import('./components/campaign/campaign.module').then(mod => mod.CampaignModule),
                canActivate: [GuardService],
                data: { roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.CONTENT_ADMIN, Role.VIEWER] }
            },
        ]
    },
    {
        path: 'auth',
        canActivate: [GuardLoginService],
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'public',
        loadChildren: () => import('./components/public-page/public-page.module').then(m => m.PublicPageModule)
    },
    { path: 'invalid-permission', component: InvalidPermissionComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
