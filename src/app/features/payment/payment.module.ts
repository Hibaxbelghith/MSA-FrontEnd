import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// Components
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { RefundListComponent } from './pages/refund-list/refund-list.component';
import { RefundFormComponent } from './pages/refund-form/refund-form.component';
import { PaymentStatisticsComponent } from './pages/payment-statistics/payment-statistics.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { PaymentMethodSelectorComponent } from './components/payment-method-selector/payment-method-selector.component';
import { PaymentStatusBadgeComponent } from './components/payment-status-badge/payment-status-badge.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
    RefundListComponent,
    RefundFormComponent,
    PaymentStatisticsComponent,
    PaymentDetailsComponent,
    PaymentMethodSelectorComponent,
    PaymentStatusBadgeComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    NgChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    Ng2GoogleChartsModule
  ],
  exports: [
    PaymentMethodSelectorComponent,
    PaymentStatusBadgeComponent
  ]
})
export class PaymentModule { }