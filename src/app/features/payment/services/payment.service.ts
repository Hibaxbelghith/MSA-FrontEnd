import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, filter, map } from 'rxjs/operators';
import { Payment } from '../models/payment';
import { PaymentRequest } from '../models/payment-request';
import { PaymentVerification } from '../models/payment-verification';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8083/api/v1/payments';

  constructor(private http: HttpClient) { }

  createPayment(paymentRequest: PaymentRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, paymentRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError<number>('createPayment'))
    );
  }

  verifyPayment(paymentVerification: PaymentVerification): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/verify`, paymentVerification, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError<string>('verifyPayment'))
    );
  }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError<Payment[]>('getAllPayments', []))
    );
  }

  getPaymentById(id: number): Observable<Payment> {
    if (!id || isNaN(id)) {
      console.error('Invalid ID passed to getPaymentById:', id);
      return throwError(() => new Error('Invalid ID'));
    }
  
    return this.http.get<Payment>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('getPaymentById failed:', error);
        return throwError(() => error);
      })
    );
  }

  sendOtpEmail(email: string, otp: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-otp-email`, 
      { email, otp },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      catchError(this.handleError<void>('sendOtpEmail'))
    );
  }

  sendOtpSms(phoneNumber: string, otp: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-otp-sms`, 
      { phoneNumber, otp },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      catchError(this.handleError<void>('sendOtpSms'))
    );
  }

  sendOtp(contactInfo: {email?: string, phoneNumber?: string}, otp: string): Observable<void> {
    if (contactInfo.phoneNumber) {
      return this.sendOtpSms(contactInfo.phoneNumber, otp);
    } else if (contactInfo.email) {
      return this.sendOtpEmail(contactInfo.email, otp);
    }
    return throwError(() => new Error('Aucune méthode de contact disponible'));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /*exportPaymentToPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/export-pdf`, {
      responseType: 'blob' // Important pour recevoir le fichier PDF
    }).pipe(
      catchError(this.handleError<Blob>('exportPaymentToPDF'))
    );
  }*/

    exportPaymentToPDF(id: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/${id}/export-pdf`, {
        responseType: 'blob',
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        })
      }).pipe(
        catchError(error => {
          console.error('PDF export error:', error);
          return throwError(() => new Error('Échec de la génération du PDF'));
        })
      );
    }
    
  
}