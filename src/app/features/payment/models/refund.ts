import { Payment } from "./payment";

export interface Refund {
  id: number;
  payment: Payment;
  refundAmount: number;
  status: RefundStatus;
  requestDate: Date;
  processedDate: Date | null;
}

export enum RefundStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
