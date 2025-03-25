import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

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
  size: number = 5; // Change size as needed
  totalPages: number = 0;

  searchFirstName: string = '';
  searchLastName: string = '';

  constructor(private customerService: CustomerService) {}

  
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data) => {
        console.log('Réponse de l\'API :', data); // Vérifier la réponse reçue
        this.customers = data.content; // Vérifiez bien que la réponse contient 'content'
        console.log('Liste des clients :', this.customers);
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }
  searchCustomers(firstName: string, lastName: string): void {
    if (!firstName && !lastName) {
      alert("Veuillez entrer un prénom ou un nom pour rechercher !");
      return;
    }
  
    this.customerService.getCustomers(0, 10, firstName, lastName).subscribe(
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

  editCustomer(customer: any): void { 
    const updatedFirstName = prompt("Modifier le prénom :", customer.firstName);
    const updatedLastName = prompt("Modifier le nom :", customer.lastName);
  
    if (updatedFirstName !== null && updatedLastName !== null) {
      const updatedCustomer = { 
        id: customer.id, 
        firstName: updatedFirstName, 
        lastName: updatedLastName 
      };
  
      console.log("Données envoyées à l'API :", updatedCustomer); // DEBUG
  
      this.customerService.updateCustomer(updatedCustomer).subscribe(() => {
        alert('Client modifié avec succès !');
        this.loadCustomers();
      }, (error) => {
        console.error('Erreur lors de la modification du client :', error);
        console.error('Réponse complète de l\'API :', error.error); // Ajout de détails
      });
    }
  }
  
  
  

  deleteCustomer(customerId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.customerService.deleteCustomer(customerId).subscribe(() => {
        alert('Client supprimé avec succès !');
        this.loadCustomers();
      });
    }
  }
  

  
  

  
}
