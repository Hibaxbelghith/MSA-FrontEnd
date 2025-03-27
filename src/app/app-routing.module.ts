import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/customer/pages/auth/login.component';
import { SignupComponent } from './features/customer/pages/auth/signup.component';
import { EditCustomerComponent } from './features/customer/pages/customer-form/edit-customer/edit-customer.component';

const routes: Routes = [
  //the main routing loads the CustomerModule lazily
  { path: 'dashboard', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default redirect
  { path: '**', redirectTo: '/login' } // Redirect unknown routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
