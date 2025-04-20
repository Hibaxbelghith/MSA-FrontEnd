import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/customer/pages/auth/login.component';
import { SignupComponent } from './features/customer/pages/auth/signup.component';
import { EditCustomerComponent } from './features/customer/pages/customer-form/edit-customer/edit-customer.component';
import { ForgotPasswordComponent } from './features/customer/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/customer/pages/reset-password/reset-password.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AvisListComponent } from './avis-list/avis-list.component';
import { ProductsPageComponent } from './features/product/pages/products/products-page.component';
import { ProductCreateComponent } from './features/product/components/product-create/product-create.component';
import { ProductEditComponent } from './features/product/components/product-edit/product-edit.component';
import { ProductDetailComponent } from './features/product/components/product-detail/product-detail.component';
import { ProductStatisticsComponent } from './features/product/components/product-statistics/product-statistics.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'home', component: HomeComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'avis', component: AvisListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path:'statistics', component: ProductStatisticsComponent },
  { path: 'products', loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) },
  
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default redirect
  { path: '**', redirectTo: '/home' } // Redirect unknown routes
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
