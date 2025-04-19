// order-create.component.ts
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
  successMessage = '';

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
      // Check if product already exists
      const existingIndex = this.orderRequest.products.findIndex(
        p => p.productId === this.newProduct.productId
      );
      
      if (existingIndex >= 0) {
        // Update quantity if product exists
        this.orderRequest.products[existingIndex].quantity += this.newProduct.quantity;
      } else {
        // Add new product
        this.orderRequest.products.push({...this.newProduct});
      }
      
      this.newProduct = { productId: 0, quantity: 1 };
    }
  }

  removeProduct(index: number): void {
    this.orderRequest.products.splice(index, 1);
  }

  updateQuantity(index: number, newQuantity: number): void {
    if (newQuantity > 0) {
      this.orderRequest.products[index].quantity = newQuantity;
    }
  }

  calculateTotal(): number {
    return this.orderRequest.products.reduce((total, product) => {
      // In a real app, you would fetch the product price from a service
      return total + (product.quantity * 10); // Assuming each product costs $10 for demo
    }, 0);
  }

  submitOrder(): void {
    if (this.orderRequest.products.length === 0) {
      this.errorMessage = 'Please add at least one product';
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
  
    this.orderService.createOrder(this.orderRequest).subscribe({
      next: (order) => {
        this.isLoading = false;
        this.successMessage = `Order ${order.reference} created successfully!`;
        setTimeout(() => this.router.navigate(['/orders', order.id]), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to create order. Please try again.';
        console.error('Order creation error:', err);
      }
    });
  }
}