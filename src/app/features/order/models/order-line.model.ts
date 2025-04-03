export interface OrderLine {
    id?: number;
    quantity: number;
    productId: number;
    orderId?: number;
  }
  
  export interface OrderLineRequest {
    orderId: number;
    productId: number;
    quantity: number;
  }
  
  export interface OrderLineResponse {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }