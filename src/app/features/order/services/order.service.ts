import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { OrderRequest, Order, OrderResponse } from '../models/order.model';
import { OrderLineResponse } from '../models/order-line.model'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/v1/orders`;

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, orderRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Full error response:', error);
        if (error.status === 200) {
          // Try to manually parse if automatic parsing failed
          try {
            const parsed = JSON.parse(error.error.text());
            return of(parsed);
          } catch (e) {
            throw new Error('Failed to parse response: ' + error.error.text());
          }
        }
        throw error;
      })
    );
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching orders:', error);
        throw error;
      })
    );
  }

  getOrderCountByCustomer(customerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/${customerId}`);
  }

  getOrderLinesByOrderId(orderId: number): Observable<OrderLineResponse[]> {
    return this.http.get<OrderLineResponse[]>(`${this.apiUrl}/${orderId}/order-lines`);
  }

  getOrderById(orderId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${orderId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching order:', error);
        throw error;
      })
    );
  }
}