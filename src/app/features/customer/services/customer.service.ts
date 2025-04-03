import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8089/customer/customer'; // backend API
  private apiAvis = 'http://localhost:5000/api/avis';

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
    getCustomers(page: number = 0, size: number = 3, firstName?: string, lastName?: string): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    
      if (firstName) params = params.set('firstName', firstName);
      if (lastName) params = params.set('lastName', lastName);
    
      return this.http.get<any>('http://localhost:8089/customer/customer/filtered', { params });
    }

    getCustomerById(customerId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/retrieve-Customer/${customerId}`); 
    }

    addCustomer(customer: any): Observable<string> {
      return this.http.post<string>(`${this.baseUrl}/add-Customer`, customer);
    }
  
    updateCustomer(customerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modify-Customer`, customerData);
}

    deleteCustomer(customerId: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/remove-Customer/${customerId}`);
    }
    
    // Méthode pour exporter en CSV
  exportToCsv(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/csv`, { responseType: 'blob' });
  }

  // Méthode pour exporter en PDF
  exportToPdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/pdf`, { responseType: 'blob' });
  }

   // Fonction pour obtenir le total des clients
   getTotalCustomers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }

  // Fonction pour obtenir le nombre de clients par code postal
  getCustomersByZipCode(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/stats/customers-by-zip`);
  }

  // Fonction pour obtenir les clients avec le nombre de commandes
  getCustomersWithOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/stats/customers-with-orders`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword });
}

// Méthode pour récupérer les avis
getAvis(): Observable<any> {
  return this.http.get<any>(this.apiAvis);
}

// Méthode pour soumettre un nouvel avis
submitAvis(avis: any): Observable<any> {
  return this.http.post<any>(this.apiAvis, avis);
}


    
  
}
