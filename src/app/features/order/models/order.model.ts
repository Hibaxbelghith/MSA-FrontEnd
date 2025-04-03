import { OrderLine } from './order-line.model';

export interface Order {
    id?: number;
    reference: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    customerId: string;
    orderLines: OrderLine[];
    quantity: number;
    createdAt?: Date;
    lastModifiedDate?: Date;
  }
  
  export interface OrderRequest {
    reference: string;
    customerId: string;
    paymentMethod: PaymentMethod;
    products: ProductRequest[];
  }
  
  export interface ProductRequest {
    productId: number;
    quantity: number;
  }
  
  export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    PAYPAL = 'PAYPAL',
    BANK_TRANSFER = 'BANK_TRANSFER'
  }