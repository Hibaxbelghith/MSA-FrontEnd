import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderResponse } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderResponse[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';
  sortField: keyof OrderResponse = 'createdAt'; // Ensures field exists on OrderResponse
  sortDirection = 'desc';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.sortOrders();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders';
        this.isLoading = false;
        console.error('Error loading orders:', err);
      }
    });
  }

  sortOrders(): void {
    this.orders.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }

      return 0;
    });
  }

  onSort(field: keyof OrderResponse): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortOrders();
  }

  get filteredOrders(): OrderResponse[] {
    if (!this.searchTerm) return this.orders;
    return this.orders.filter(order => 
      order.reference.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.customerId.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}