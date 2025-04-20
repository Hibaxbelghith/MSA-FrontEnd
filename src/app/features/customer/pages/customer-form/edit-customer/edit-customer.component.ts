import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {

  customerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  customerId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID du client depuis l'URL
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
    
    // Appeler le service pour obtenir les détails du client
    this.customerService.getCustomerById(this.customerId).subscribe(customer => {
      // Remplir le formulaire avec les données du client
      this.customerForm.patchValue({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        address: {
          street: customer.address?.street,
      houseNumber: customer.address?.houseNumber,
      zipCode: customer.address?.zipCode,
        }
        
      });
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const updatedCustomer = { id: this.customerId, ...this.customerForm.value };
      console.log("Données envoyées :", JSON.stringify(updatedCustomer, null, 2));
  
      this.customerService.updateCustomer(updatedCustomer)
        .subscribe({
          next: (response) => {
            console.log("Mise à jour réussie:", response);
            this.snackBar.open('Client mis à jour avec succès !', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour:", error);
            this.snackBar.open(error.error.message || 'Erreur lors de la mise à jour du client !', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          
          }
        });
    }
  }
  
  
  get f() { return this.customerForm.controls; }

  get firstname() {
    return this.f['firstname'];
  }

  get lastname() {
    return this.f['lastname'];
  }

  get email() {
    return this.f['email'];
  }

  get password() {
    return this.f['password'];
  }

  get address() {
    return this.f['address'];
  }

  get street() {
    return this.address.get('street');
  }

  get houseNumber() {
    return this.address.get('houseNumber');
  }

  get zipCode() {
    return this.address.get('zipCode');
  } 

}
