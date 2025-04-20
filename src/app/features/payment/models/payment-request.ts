import { Customer, PaymentMethod } from "./payment";
export interface PaymentRequest {
  id?: number;
  amount: number;
  paymentMethod: PaymentMethod;
  orderId: number;
  orderReference: string;
  customer: Customer;
  phoneNumber?: string;
}