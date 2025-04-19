import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { EditCustomerComponent } from './pages/customer-form/edit-customer/edit-customer.component';
import { CustomerStatisticsComponent } from './pages/customer-statistics/customer-statistics.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';
import { NotificationStatsComponent } from 'src/app/notification-stats/notification-stats.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent, // Le layout global du dashboard
    children: [
      { path: 'list', component: CustomerListComponent }, // '/dashboard/customers/list'
      { path: 'edit-customer/:id', component: EditCustomerComponent },
      { path: 'statistics', component: CustomerStatisticsComponent },
      { path: 'notification-stats', component: NotificationStatsComponent }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
