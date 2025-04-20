import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { RefundListComponent } from './pages/refund-list/refund-list.component';
import { RefundFormComponent } from './pages/refund-form/refund-form.component';
import { PaymentStatisticsComponent } from './pages/payment-statistics/payment-statistics.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { DashboardLayoutComponent } from 'src/app/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',  // Ce chemin est relatif au path 'payments' défini dans app-routing
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: PaymentListComponent },
      { path: 'new', component: PaymentFormComponent },
      { path: 'payments/:id', component: PaymentDetailsComponent },
      { path: ':id/verify', component: PaymentFormComponent },
      { path: 'refunds', component: RefundListComponent },
      { path: 'refunds/new', component: RefundFormComponent },
      { path: 'statistics', component: PaymentStatisticsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }