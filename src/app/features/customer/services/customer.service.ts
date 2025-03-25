import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8089/customer/customer'; // Your backend API


  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signup(customerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, customerData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
  }
  
  /* get all customers
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl); 
  }*/

    //get all customers with pagination and filtering
    getCustomers(page: number = 0, size: number = 10, firstName?: string, lastName?: string): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    
      if (firstName) params = params.set('firstName', firstName);
      if (lastName) params = params.set('lastName', lastName);
    
      return this.http.get<any>('http://localhost:8089/customer/customer/filtered', { params });
    }

    addCustomer(customer: any): Observable<string> {
      return this.http.post<string>(`${this.baseUrl}/add-Customer`, customer);
    }
  
    updateCustomer(customer: any): Observable<void> {
      return this.http.put<void>(`${this.baseUrl}/modify-Customer`, customer);
    }
  
    deleteCustomer(customerId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/remove-Customer/${customerId}`);
    }
    
    
  
}
