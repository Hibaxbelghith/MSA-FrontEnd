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
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { NotificationStatsComponent } from './notification-stats/notification-stats.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardLayoutComponent,
    HomeComponentComponent,
    AvisListComponent,
    StarRatingComponent,
    OrderSuccessComponent,
    PaymentSuccessComponent,
 
    NotificationStatsComponent,
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomerModule,
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
