import { DataSharingService } from './../../services/data-sharing/data-sharing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremisesComponent } from './premises-component/premises/premises.component';
import { PremisesDetailComponent } from './premises-component/premises-detail/premises-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

import { PremisesService } from 'src/app/services/premises/premises.service';


export const hrmsRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'premises',
    component: PremisesComponent
  },
  {
    path: 'premises/details',
    component: PremisesDetailComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    PremisesComponent,
    PremisesDetailComponent
  ],
  providers: [
    PremisesService,
    DataSharingService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(hrmsRoutes)
  ]
})
export class HrmsModule { }
