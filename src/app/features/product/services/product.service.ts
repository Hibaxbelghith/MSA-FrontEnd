import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPurchaseRequest, ProductPurchaseResponse, ProductRequest, ProductResponse, ProductStatistics } from '../product.model';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8088/product/api/v1/product';

  constructor(private http: HttpClient) { }

 /* createProduct(product: ProductRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, product);
  }*/

    createProduct(product: ProductRequest): Observable<number> {
      return this.http.post<number>(this.apiUrl, product, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        catchError(error => {
          console.error('Full error:', error);
          if (error.status === 0) {
            throw 'Backend is unreachable. Is it running on port 8088?';
          }
          throw error.error?.message || 'Unknown error occurred';
        })
      );
    }
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }

  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.apiUrl);
  }

  purchaseProducts(purchases: ProductPurchaseRequest[]): Observable<ProductPurchaseResponse[]> {
    return this.http.post<ProductPurchaseResponse[]>(`${this.apiUrl}/purchase`, purchases);
  }

  getProductStatistics(): Observable<ProductStatistics> {
    return this.http.get<ProductStatistics>(`${this.apiUrl}/stats`);
  }



  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Delete failed:', error);
        throw 'Failed to delete product';
      })
    );
  }
  
  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/update/${id}`, product).pipe(
      catchError(error => {
        console.error('Update failed:', error);
        throw 'Failed to update product';
      })
    );
  }
  
  

  
}

