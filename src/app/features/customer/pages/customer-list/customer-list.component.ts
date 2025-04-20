import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  
  customers: any[] = [];
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  page: number = 0;
  size: number = 3; 
  totalPages: number = 0;

  searchFirstName: string = '';
  searchLastName: string = '';

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar, private router: Router) {}

  
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers(this.page, this.size, this.searchFirstName, this.searchLastName).subscribe(
      (data) => {
        console.log('Réponse de l\'API :', data); 
        this.customers = data.content; 
        this.totalPages = data.totalPages; 
        console.log('Total des pages :', this.totalPages);
        console.log('Clients récupérés :', this.customers);
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }
  searchCustomers(firstName: string, lastName: string): void {
    if (!firstName && !lastName) {
      this.snackBar.open('Veuillez entrer un prénom ou un nom pour rechercher !', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      return;
    }
  
    this.customerService.getCustomers(0, 3, firstName, lastName).subscribe(
      (data) => {
        console.log('Résultats de la recherche :', data);
        this.customers = data.content;
      },
      (error) => {
        console.error('Erreur de recherche:', error);
      }
    );
  }
  

  //pagination

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadCustomers();
    }
  }
  getPageNumbers(): number[] {
    let pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  editCustomer(customer : any): void {
    console.log(customer);
    this.router.navigate(['/edit-customer', customer.id]); 
  }


  deleteCustomer(customerId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.customerService.deleteCustomer(customerId).subscribe(() => {
        this.snackBar.open('Client supprimé avec succès !', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.loadCustomers();
      });
    }
  }

  // Fonction pour exporter en CSV
  exportToCsv(): void {
    this.customerService.exportToCsv().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'customers.csv';
        link.click();
      },
      (error) => {
        this.snackBar.open('Erreur lors de l\'exportation en CSV', 'Fermer', { duration: 3000 });
      }
    );
  }

  // Fonction pour exporter en PDF
  exportToPdf(): void {
    this.customerService.exportToPdf().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'customers.pdf';
        link.click();
      },
      (error) => {
        this.snackBar.open('Erreur lors de l\'exportation en PDF', 'Fermer', { duration: 3000 });
      }
    );
  }
  

  
  

  
}
