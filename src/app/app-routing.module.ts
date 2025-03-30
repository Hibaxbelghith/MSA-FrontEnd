import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/customer/pages/auth/login.component';
import { SignupComponent } from './features/customer/pages/auth/signup.component';
import { EditCustomerComponent } from './features/customer/pages/customer-form/edit-customer/edit-customer.component';
import { ForgotPasswordComponent } from './features/customer/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/customer/pages/reset-password/reset-password.component';
import { HomeComponentComponent } from './home-component/home-component.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect
  { path: '**', redirectTo: '/login' } // Redirect unknown routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
