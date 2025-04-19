import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationWatcherService } from './features/customer/services/notification-watcher.service';
import { Notification } from 'src/app/models/notification.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-front';

  constructor(
    private notificationWatcher: NotificationWatcherService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.notificationWatcher.latestNotification$.subscribe((notification: Notification | null) => {
    if (!notification) return;

    console.log('Received notification:', notification); // 🔍 Add this line

    if (notification.type === 'ORDER_CONFIRMATION') {
      this.router.navigate(['/order-success']);
    } else if (notification.type === 'PAYMENT_CONFIRMATION') {
      this.router.navigate(['/payment-success']);
    }
  });
}



}
