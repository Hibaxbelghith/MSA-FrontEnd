import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentMethod , PaymentStatus } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentStatisticsService {
  private apiUrl = 'http://localhost:8083/api/v1/payments/statistics';

  constructor(private http: HttpClient) { }

  getTotalPayments(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-payments`);
  }

  getTotalAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-amount`);
  }

  getPaymentsByStatus(): Observable<{ [status: string]: number }> {
    return this.http.get<{ [status: string]: number }>(`${this.apiUrl}/payments-by-status`);
  }
  
  getTotalAmountByPaymentMethod(): Observable<{ [method: string]: number }> {
    return this.http.get<{ [method: string]: number }>(`${this.apiUrl}/amount-by-method`);
  }

  getAveragePaymentAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average-amount`);
  }
}