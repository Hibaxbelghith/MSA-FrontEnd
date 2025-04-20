export interface Product {
    id: number;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    category: Category;
  }
  
  export interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  export interface ProductRequest {
    id?: number;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    categoryId: number;
  }
  
  export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
  }
  
  export interface ProductPurchaseRequest {
    productId: number;
    quantity: number;
  }
  
  export interface ProductPurchaseResponse {
    productId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface ProductStatistics {
    totalSales: number;
    topProducts: Product[];
  }