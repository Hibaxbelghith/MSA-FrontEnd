// src/app/feature/order/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest, Order } from '../models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/api/v1/orders`;

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderRequest);
  }


}