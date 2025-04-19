import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/customer/pages/auth/login.component';
import { SignupComponent } from './features/customer/pages/auth/signup.component';
import { OrderCreateComponent } from './features/order/components/order-create/order-create.component';
import { OrderListComponent } from './features/order/components/order-list/order-list.component';
import { OrderDetailComponent } from './features/order/components/order-detail/order-detail.component';

const routes: Routes = [
  //the main routing loads the CustomerModule lazily
  { path: 'dashboard', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'orders/create', component: OrderCreateComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
