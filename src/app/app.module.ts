import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './features/customer/customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AvisListComponent } from './avis-list/avis-list.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderCreateComponent } from './features/order/components/order-create/order-create.component';
import { OrderListComponent } from './features/order/components/order-list/order-list.component';
import { OrderDetailComponent } from './features/order/components/order-detail/order-detail.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { NotificationStatsComponent } from './notification-stats/notification-stats.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardLayoutComponent,
    HomeComponentComponent,
    AvisListComponent,
    StarRatingComponent,
    OrderCreateComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderSuccessComponent,
    PaymentSuccessComponent,
    NotificationStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgChartsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }