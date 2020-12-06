import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

import { ReportsService } from 'src/app/services/reports/reports.service';

import { ChartsModule } from 'ng2-charts';
import { RacksAndShelvesComponent } from './racks-and-shelves/racks-and-shelves.component';
import { WarehouseService } from 'src/app/services/warehouse/warehouse.service';

export const wmsRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'racks-and-shelves',
    component: RacksAndShelvesComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    RacksAndShelvesComponent
  ],
  providers: [
    WarehouseService,
    ReportsService
  ],
  imports: [
    RouterModule.forChild(wmsRoutes),
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1QAe_TPquPkEbRb_GPk3Hf2F0-rz76Dw',
      libraries: ['places']
    }),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WmsModule { }
