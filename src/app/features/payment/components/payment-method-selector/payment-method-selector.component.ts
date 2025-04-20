import { Component, Input } from '@angular/core';
import { PaymentMethod } from '../../models/payment';

@Component({
  selector: 'app-payment-method-selector',
  templateUrl: './payment-method-selector.component.html',
  styleUrls: ['./payment-method-selector.component.css']
})
export class PaymentMethodSelectorComponent {
  @Input() method: PaymentMethod = PaymentMethod.CREDIT_CARD;

  getMethodIcon(): string {
    switch(this.method) {
      case PaymentMethod.PAYPAL: return 'paypal';
      case PaymentMethod.CREDIT_CARD: return 'credit_card';
      case PaymentMethod.VISA: return 'account_balance';
      case PaymentMethod.MASTER_CARD: return 'payment';
      case PaymentMethod.BITCOIN: return 'currency_bitcoin';
      default: return 'payment';
    }
  }

  getMethodLabel(): string {
    return this.method.split('_').join(' ');
  }
}