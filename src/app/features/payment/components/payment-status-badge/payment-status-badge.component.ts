import { Component, Input } from '@angular/core';
import { PaymentStatus } from '../../models/payment';

@Component({
  selector: 'app-payment-status-badge',
  templateUrl: './payment-status-badge.component.html',
  styleUrls: ['./payment-status-badge.component.css']
})
export class PaymentStatusBadgeComponent {
  @Input() status: PaymentStatus = PaymentStatus.PENDING;

  getStatusColor(): string {
    switch(this.status) {
      case PaymentStatus.PENDING: return 'accent';
      case PaymentStatus.CONFIRMED: return 'primary';
      case PaymentStatus.FAILED: return 'warn';
      default: return '';
    }
  }

  getStatusIcon(): string {
    switch(this.status) {
      case PaymentStatus.PENDING: return 'pending';
      case PaymentStatus.CONFIRMED: return 'check_circle';
      case PaymentStatus.FAILED: return 'error';
      default: return '';
    }
  }
}