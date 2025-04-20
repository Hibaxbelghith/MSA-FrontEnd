// notification-stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationStatsService {
  private apiUrl = 'http://localhost:8087/api/notifications/stats'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getNotificationStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}