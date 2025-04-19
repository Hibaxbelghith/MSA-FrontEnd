import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Notification } from 'src/app/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationWatcherService {
  private latestNotificationSubject = new BehaviorSubject<Notification | null>(null);
  latestNotification$ = this.latestNotificationSubject.asObservable();

  private lastSeenId: string | null = null;

  constructor(private notificationService: NotificationService) {
    interval(5000).pipe(
      switchMap(() => this.notificationService.getAllNotifications())
    ).subscribe(notifications => {
      if (notifications.length > 0) {
        const latest = notifications[notifications.length - 1]; // assuming last is latest

        if (latest.id !== this.lastSeenId) {
          this.lastSeenId = latest.id;
          this.latestNotificationSubject.next(latest);
        }
      }
    });
  }
}
