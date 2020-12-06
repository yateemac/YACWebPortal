import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompncallsComponent } from './compncalls-component/compncalls/compncalls.component';
import { CallsService } from '../../services/calls/calls.service';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ServiceAgreementsComponent } from './service-agreement-component/service-agreements/service-agreements.component';
import { CompncallsChildComponent } from './compncalls-component/compncalls-child/compncalls-child.component';
import { ServiceAgreementsChildComponent } from './service-agreement-component/service-agreements-child/service-agreements-child.component';
import { ServiceAgreementsWorkorderDetailsComponent } from './service-agreement-component/service-agreements-workorder-details/service-agreements-workorder-details.component';
import { ServiceAgreementsCustomerWiseAgeingComponent } from './service-agreement-component/service-agreements-customer-wise-ageing/service-agreements-customer-wise-ageing.component';

export const mmpRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'complaints-and-calls',
    component: CompncallsComponent
  },
  {
    path: 'service-agreements',
    component: ServiceAgreementsComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent, 
    CompncallsComponent, 
    CompncallsChildComponent, 
    ServiceAgreementsComponent, 
    ServiceAgreementsChildComponent, 
    ServiceAgreementsWorkorderDetailsComponent, 
    ServiceAgreementsCustomerWiseAgeingComponent
  ],
  providers: [
    CallsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mmpRoutes),
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
  ]
})
export class MmpModule { }
