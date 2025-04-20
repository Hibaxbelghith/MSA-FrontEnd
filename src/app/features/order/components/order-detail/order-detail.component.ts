import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderLineService } from '../../services/order-line.service';
import { OrderResponse } from '../../models/order.model';
import { OrderLineResponse } from '../../models/order-line.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: OrderResponse | null = null;
  orderLines: OrderLineResponse[] = [];
  isLoading = false;
  errorMessage = '';
  activeTab = 'items';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderLineService: OrderLineService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(+orderId);
    }
  }

  loadOrderDetails(orderId: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.orderService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.loadOrderLines(orderId);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load order details';
        this.isLoading = false;
      }
    });
  }

  loadOrderLines(orderId: number): void {
    this.orderLineService.getOrderLinesByOrderId(orderId).subscribe({
      next: (lines) => {
        this.orderLines = lines;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load order items';
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  printOrder(): void {
    window.print();
  }
}