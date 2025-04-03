import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderLineRequest, OrderLineResponse } from '../models/order-line.model';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {
  private apiUrl = 'http://localhost:8080/api/v1/order-lines';

  constructor(private http: HttpClient) { }

  createOrderLine(request: OrderLineRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }

  getOrderLinesByOrderId(orderId: number): Observable<OrderLineResponse[]> {
    return this.http.get<OrderLineResponse[]>(`${this.apiUrl}/order/${orderId}`);
  }
}