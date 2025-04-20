export interface Payment {
    id: number;
    amount: number;
    paymentMethod: PaymentMethod;
    otpCode: string;
    otpExpiration: Date;
    paymentStatus: PaymentStatus;
    orderId: number;
    orderReference: string;
    createdDate: Date;
    lastModifiedDate: Date;
    customer: Customer;
  }
  
  export interface Customer {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  }
  
  export enum PaymentMethod {
    PAYPAL = 'PAYPAL',
    CREDIT_CARD = 'CREDIT_CARD',
    VISA = 'VISA',
    MASTER_CARD = 'MASTER_CARD',
    BITCOIN = 'BITCOIN'
  }
  
  export enum PaymentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED'
  }