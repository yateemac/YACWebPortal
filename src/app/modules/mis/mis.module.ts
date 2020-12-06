import { ReportsService } from 'src/app/services/reports/reports.service';
import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecievablesComponent } from './recievables/recievables.component';
import { RouterModule } from '@angular/router';
import { SalesComponent } from './sales-component/sales/sales.component';
import { PayablesComponent } from './payables/payables.component';
import { HrComponent } from './hr/hr.component';
import { FinancialsComponent } from './financials/financials.component';
import { SalesShowroomComponent } from './sales-component/sales-showroom/sales-showroom.component';
import { SalesServiceDepartmentComponent } from './sales-component/sales-service-department/sales-service-department.component';
import { SalesContractsComponent } from './sales-component/sales-contracts/sales-contracts.component';
import { SalesOneStopShopComponent } from './sales-component/sales-one-stop-shop/sales-one-stop-shop.component';
import { MatDatepickerModule, MatIconModule, MatInputModule } from '@angular/material';

export const misRoutes = [
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'sales/showroom',
    component: SalesShowroomComponent
  },
  {
    path: 'sales/service-department',
    component: SalesServiceDepartmentComponent
  },
  {
    path: 'sales/contracts',
    component: SalesContractsComponent
  },
  {
    path: 'sales/one-stop-shop',
    component: SalesOneStopShopComponent
  },
  {
    path: 'receivables',
    component: RecievablesComponent
  },
  {
    path: 'payables',
    component: PayablesComponent
  },
  {
    path: 'hr',
    component: HrComponent
  },
  {
    path: 'financials',
    component: FinancialsComponent
  }
];

@NgModule({
  declarations: [
    RecievablesComponent, 
    SalesComponent, 
    PayablesComponent, 
    HrComponent, 
    FinancialsComponent, 
    SalesShowroomComponent, 
    SalesServiceDepartmentComponent, 
    SalesContractsComponent, 
    SalesOneStopShopComponent
  ],
  providers: [
    ReportsService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(misRoutes),
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    ChartsModule
  ]
})
export class MisModule { }
