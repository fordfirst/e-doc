import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { AuthGuardService } from '@services/authGuard.service';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            // {
            //     path: '',
            //     redirectTo: '/meeting-management',
            //     pathMatch: "full"
            // },
            {
                path: 'meeting-management',
                loadChildren: () => import('./components/meeting-management/meeting-management.module').then(m => m.MeetingManagementModule)
            },
            // {
            //     path: 'notification-management',
            //     loadChildren: () => import('./components/notification-management/notification-management.module').then(m => m.NotificationManagementModule)
            // },
            // {
            //     path: 'meeting-archives-management',
            //     loadChildren: () => import('./components/meeting-management-archives/meeting-management.module').then(m => m.MeetingManagementModule)
            // },
            // {
            //     path: 'archives',
            //     loadChildren: () => import('./components/archives/archives.module').then(m => m.ArchivesModule)
            // },
            {
                path: 'annual-report',
                loadChildren: () => import('./components/annual-report/annual-report.module').then(m => m.AnnualReportModule)
            },
            // {
            //     path: 'company-document',
            //     loadChildren: () => import('./components/company-document/company-document.module').then(m => m.CompanyDocumentModule)
            // },
            // {
            //     path: 'meeting-setting',
            //     loadChildren: () => import('./components/meeting-setting/meeting-setting.module').then(m => m.MeetingSettingModule)
            // },
        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'pdf-viewer', loadChildren: () => import('./components-shared/my-pdf-viewer/my-pdf-viewer.module').then(mod => mod.MyPdfViewerModule),
    },
    { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
