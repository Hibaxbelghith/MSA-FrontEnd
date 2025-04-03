import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderRequest, ProductRequest, PaymentMethod } from '../../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {
  orderRequest: OrderRequest = {
    reference: this.generateOrderReference(),
    customerId: '',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    products: []
  };

  newProduct: ProductRequest = {
    productId: 0,
    quantity: 1
  };

  paymentMethods = Object.values(PaymentMethod);
  isLoading = false;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  private generateOrderReference(): string {
    const now = new Date();
    return `ORD-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
  }

  addProduct(): void {
    if (this.newProduct.productId > 0 && this.newProduct.quantity > 0) {
      this.orderRequest.products.push({...this.newProduct});
      this.newProduct = { productId: 0, quantity: 1 };
    }
  }

  removeProduct(index: number): void {
    this.orderRequest.products.splice(index, 1);
  }

  submitOrder(): void {
    if (this.orderRequest.products.length === 0) {
      this.errorMessage = 'Please add at least one product';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.createOrder(this.orderRequest).subscribe({
      next: (order) => {
        this.isLoading = false;
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create order';
        console.error('Error creating order:', err);
      }
    });
  }
}