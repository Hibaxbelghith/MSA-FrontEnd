import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderLineResponse } from '../models/order-line.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {
  private apiUrl = `${environment.apiUrl}/api/v1/order-lines`;

  constructor(private http: HttpClient) { }

  getOrderLinesByOrderId(orderId: number): Observable<OrderLineResponse[]> {
    return this.http.get<OrderLineResponse[]>(`${this.apiUrl}/order/${orderId}`);
  }
}