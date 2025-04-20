import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/customer/pages/auth/login.component';
import { SignupComponent } from './features/customer/pages/auth/signup.component';
import { EditCustomerComponent } from './features/customer/pages/customer-form/edit-customer/edit-customer.component';
import { ForgotPasswordComponent } from './features/customer/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/customer/pages/reset-password/reset-password.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AvisListComponent } from './avis-list/avis-list.component';
import { OrderCreateComponent } from './features/order/components/order-create/order-create.component';
import { OrderListComponent } from './features/order/components/order-list/order-list.component';
import { OrderDetailComponent } from './features/order/components/order-detail/order-detail.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { NotificationStatsComponent } from './notification-stats/notification-stats.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'avis', component: AvisListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'orders/create', component: OrderCreateComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payments', loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) },
  { path: '**', redirectTo: '/login' } 
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default redirect
  // { path: '**', redirectTo: '/home' } // Redirect unknown routes
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
