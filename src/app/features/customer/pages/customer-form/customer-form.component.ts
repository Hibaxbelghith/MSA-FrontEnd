import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  @Input() customer: any = { firstname: '', lastname: '', email: '', address: {} };
  isEditMode = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  saveCustomer(): void {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customer).subscribe(() => {
        alert('Client mis à jour avec succès !');
        this.router.navigate(['/customers/list']);
      });
    } else {
      this.customerService.addCustomer(this.customer).subscribe(() => {
        alert('Client ajouté avec succès !');
        this.router.navigate(['/customers/list']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/customers/list']);
  }
}
