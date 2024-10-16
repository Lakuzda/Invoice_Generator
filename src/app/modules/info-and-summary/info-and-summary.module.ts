import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoAndSummaryRoutingModule } from './info-and-summary-routing.module';
import { InfoAndSummaryComponent } from './info-and-summary.component';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [InfoAndSummaryComponent],
  imports: [
    CommonModule,
    InfoAndSummaryRoutingModule,
    MatCardModule,
    MatListModule,
  ],
})
export class InfoAndSummaryModule {}
