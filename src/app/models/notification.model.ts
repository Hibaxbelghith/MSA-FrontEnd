// src/app/models/notification.model.ts

export enum NotificationType {
    ORDER_CONFIRMATION = 'ORDER_CONFIRMATION',
    PAYMENT_CONFIRMATION = 'PAYMENT_CONFIRMATION'
  }
  
  export interface Notification {
    id: string;
    type: NotificationType;
    notificationDate: string; // or Date if you'll convert it
    orderConfirmationJson?: string;
    paymentConfirmationJson?: string;
  }