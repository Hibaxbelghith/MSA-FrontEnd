import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        zipCode: ['', Validators.required]
      })
    });
  }

  // Méthode pour envoyer le formulaire
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    this.customerService.signup(this.signupForm.value).subscribe(
      (response) => {
        console.log('✅ Response from backend:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('❌ Signup error:', error);
        this.errorMessage = error.error.message || 'Error during registration';
      }
    );
  }

  // Méthode pour accéder aux champs du formulaire avec la syntaxe correcte
  get f() { return this.signupForm.controls; }

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
