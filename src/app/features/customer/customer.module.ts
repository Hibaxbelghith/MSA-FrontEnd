import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    CustomerFormComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class CustomerModule { }
