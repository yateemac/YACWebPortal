import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

export const eCommRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(eCommRoutes),
    CommonModule
  ]
})
export class EcommerceModule { }
