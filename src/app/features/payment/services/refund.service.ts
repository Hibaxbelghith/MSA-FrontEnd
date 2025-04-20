import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Refund } from '../models/refund';
import { RefundRequest } from '../models/refund-request';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private apiUrl = 'http://localhost:8083/api/v1/refunds';

  constructor(private http: HttpClient) { }

  requestRefund(refundRequest: RefundRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, refundRequest);
  }

  approveRefund(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectRefund(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/reject`, {});
  }

  getAllRefunds(): Observable<Refund[]> {
    return this.http.get<Refund[]>(this.apiUrl);
  }

  getRefundById(id: number): Observable<Refund> {
    return this.http.get<Refund>(`${this.apiUrl}/${id}`);
  }
}