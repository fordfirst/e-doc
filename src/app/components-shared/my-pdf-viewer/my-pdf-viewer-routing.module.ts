import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyPdfViewerComponent} from './my-pdf-viewer.component';

const routes: Routes = [
  {path: '', component: MyPdfViewerComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPdfViewerRoutingModule { }
