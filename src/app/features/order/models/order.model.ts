import { OrderLine } from './order-line.model';

export interface Order {
    id?: number;
    reference: string;
    totalAmount: number;
    paymentMethod: string;  
    customerId: string;
    orderLines: OrderLine[];
    createdAt?: string;     
    lastModifiedDate?: string;
}

export interface OrderRequest {
    reference: string;
    customerId: string;
    paymentMethod: string;  
    products: ProductRequest[];
}

export interface OrderResponse {
    id: number;
    reference: string;
    totalAmount: number;
    paymentMethod: string;
    customerId: string;
    createdAt: string;
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
