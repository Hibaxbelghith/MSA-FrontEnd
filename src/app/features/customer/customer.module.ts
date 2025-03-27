import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditCustomerComponent } from './pages/customer-form/edit-customer/edit-customer.component';
import { CustomerStatisticsComponent } from './pages/customer-statistics/customer-statistics.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    LoginComponent,
    SignupComponent,
    EditCustomerComponent,
    CustomerStatisticsComponent
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    
  ]
})
export class CustomerModule { }
