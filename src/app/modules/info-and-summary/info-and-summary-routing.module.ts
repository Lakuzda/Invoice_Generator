import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoAndSummaryComponent } from './info-and-summary.component';

const routes: Routes = [{ path: '', component: InfoAndSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoAndSummaryRoutingModule { }
