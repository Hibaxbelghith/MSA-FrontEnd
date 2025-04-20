import { Component, OnInit } from '@angular/core';
import { NotificationService } from './features/customer/services/notification.service';
import { Router } from '@angular/router';
import { Notification } from './models/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-front';
  private shownNotificationIds: Set<string> = new Set();
  private lastNotificationId: string | null = null; // Track the last notification id
  private navigationInProgress: boolean = false; // Prevent multiple redirections

  constructor(
    private notificationService: NotificationService,
    private router: Router // Inject router here
  ) {}

  ngOnInit(): void {
    this.pollNotifications();
  }

  pollNotifications(): void {
    setInterval(() => {
      this.notificationService.getAllNotifications().subscribe((notifications: Notification[]) => {
        notifications.forEach(notification => {
          // Check if notification ID is new and hasn't been processed before
          if (!this.shownNotificationIds.has(notification.id) && notification.id !== this.lastNotificationId) {
            this.shownNotificationIds.add(notification.id);
            this.showNotification(notification);
            this.lastNotificationId = notification.id; // Update the last notification id
          }
        });
      });
    }, 5000); // Poll every 5 seconds
  }

  showNotification(notification: Notification): void {
    // Only process a new notification if a navigation isn't already in progress
    if (this.navigationInProgress) return;

    if (notification.type === 'PAYMENT_CONFIRMATION') {
      console.log('Payment notification:', notification);
      this.navigationInProgress = true; // Set to true to block further redirection
      this.router.navigate(['/payment-success']).then(() => {
        this.navigationInProgress = false; // Reset after navigation
      });
    } else if (notification.type === 'ORDER_CONFIRMATION') {
      console.log('Order notification:', notification);
      this.navigationInProgress = true;
      this.router.navigate(['/order-success']).then(() => {
        this.navigationInProgress = false;
      });
    }
  }
}
